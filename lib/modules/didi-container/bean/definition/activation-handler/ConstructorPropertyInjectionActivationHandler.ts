import { IActivationHandler } from "./IActivationHandler.ts";
import { IBeanResolverContext, IFactoryResolverContext } from "../builder/interfaces/IBeanResolverForFactory.ts";
import {
    ConstructorPropertyDecorators,
    PropertyDecorators
} from "../../../../../decorators/property/PropertyDecorators.ts";
import { Query } from "../../../../didi-queries/Query.ts";
import { BeanDefinitionNotFoundError } from "../../container/errors/BeanDefinitionNotFoundError.ts";
import { Name } from "../../../../didi-commons/Name.ts";
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
        console.log({ctor: ctor.prototype});
        for (const property of ConstructorPropertyDecorators.all(ctor.prototype)) {
            const query = new Query(property.type, property.tags);
            try {
                Object.defineProperty(
                    ctor.prototype,
                    property.name,
                    {
                        value: await resolverContext.bean(query, beanResolverContext),
                        enumerable: property.enumerable,
                        writable: !property.readonly
                    }
                );
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
        return ctor;
    }
}
