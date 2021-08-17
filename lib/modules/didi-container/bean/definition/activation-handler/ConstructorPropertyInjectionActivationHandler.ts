import { IActivationHandler } from "./IActivationHandler.ts";
import { IBeanResolverContext, IFactoryResolverContext } from "../builder/interfaces/IBeanResolverForFactory.ts";
import {
    ConstructorPropertyDecorators,
} from "../../../../../decorators/property/PropertyDecorators.ts";
import { Query } from "../../../../didi-queries/Query.ts";
import { BeanDefinitionNotFoundError } from "../../container/errors/BeanDefinitionNotFoundError.ts";
import { Name } from "../../../../didi-commons/lib/types/Name.ts";
import { IQuery } from "../../../../didi-queries/interfaces/IQuery.ts";

export class ConstructorPropertyDefaultValueNotEnabledError extends Error {
    constructor(readonly ctr: any, readonly property: Name, readonly query: IQuery<any>) {
        super(`Bean not found for property injection but default value is not explicit enabled: ${ctr.name}.${String(property)} - ${query.stringify()}`);
    }
}
export class ConstructorPropertyInjectionActivationHandler implements IActivationHandler {
    public static readonly ID: string = "ConstructorPropertyInjection";
    readonly id: string = ConstructorPropertyInjectionActivationHandler.ID;

    async apply<T>(ctor: any, resolverContext: IFactoryResolverContext<T>, beanResolverContext: IBeanResolverContext): Promise<T> {
        if (ctor.prototype === undefined) {
            return ctor;
        }
        const beanMap = new Map();
        const properties = ConstructorPropertyDecorators.all(ctor);
        for (const property of properties) {
            const query = new Query(property.type, property.tags);
            try {
                beanMap.set(property.name, await resolverContext.bean(query, beanResolverContext));
            } catch (err) {
                if (err instanceof BeanDefinitionNotFoundError) {
                    if (property.enableDefault !== true) {
                        throw new ConstructorPropertyDefaultValueNotEnabledError(ctor, property.name, query);
                    }
                } else {
                    throw err;
                }
            }
        }
        return new Proxy(ctor, {
            construct(target, ...args: any[]) {
                const instance = new target(...args);
                for (const property of properties) {
                    if (beanMap.has(property.name)) {
                        Object.defineProperty(instance, property.name, {
                            get() {
                                return beanMap.get(property.name);
                            }
                        });
                    }
                }
                return instance;
            }
        })
    }
}
