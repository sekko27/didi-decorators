import { IActivationHandler } from "./IActivationHandler.ts";
import { IBeanResolverContext, IFactoryResolverContext } from "../builder/interfaces/IBeanResolverForFactory.ts";
import {
    ConstructorPropertyDecorators,
    PropertyDecorators
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
        const proto = ctor.prototype;
        for (const property of ConstructorPropertyDecorators.all(ctor)) {
            const query = new Query(property.type, property.tags);
            console.log("CPI", property, ctor.prototype);
            try {
                const bean = await resolverContext.bean(query, beanResolverContext);
                console.log(bean, property.name, Object.getOwnPropertyDescriptor(ctor.prototype, property.name));
                Object.defineProperty(
                    ctor.prototype,
                    property.name,
                    {
                        get: () => {
                            console.log("called");
                            return bean;
                        },
                        enumerable: true,
                        configurable: true
                    }
                );
                console.log("CPIAH", ctor, ctor.prototype, (new ctor())[property.name], Object.getOwnPropertyDescriptor(ctor.prototype, property.name));
            } catch (err) {
                console.log(err);
                if (err instanceof BeanDefinitionNotFoundError) {
                    if (property.enableDefault !== true) {
                        throw new ConstructorPropertyDefaultValueNotEnabledError(ctor, property.name, query);
                    }
                } else {
                    throw err;
                }
            }
        }

        return ctor;
    }
}
