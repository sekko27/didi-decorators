import { IActivationHandler } from "./IActivationHandler.ts";
import { IFactoryResolverContext } from "../builder/interfaces/IBeanResolver.ts";
import { PropertyDecorators } from "../../../../../decorators/property/PropertyDecorators.ts";
import { Query } from "../../../../didi-queries/Query.ts";
import { BeanDefinitionNotFoundError } from "../../container/errors/BeanDefinitionNotFoundError.ts";
import { Name } from "../../../../didi-commons/Name.ts";
import { IQuery } from "../../../../didi-queries/interfaces/IQuery.ts";

export class PropertyDefaultValueNotEnabledError extends Error {
    constructor(readonly ctr: any, readonly property: Name, readonly query: IQuery<any>) {
        super(`Bean not found for property injection but default value is not explicit enabled: ${ctr.name}.${String(property)} - ${query.stringify()}`);
    }
}
export class PropertyInjectionActivationHandler implements IActivationHandler {
    public static readonly ID: string = "PropertyInjection";
    readonly id: string = PropertyInjectionActivationHandler.ID;

    async apply<T extends {constructor: ObjectConstructor}>(instance: T, resolverContext: IFactoryResolverContext<T>): Promise<T> {
        const constructor = instance.constructor;
        for (const property of PropertyDecorators.all(constructor.prototype)) {
            const query = new Query(property.type, property.tags);
            try {
                Object.defineProperty(
                    instance,
                    property.name,
                    {
                        value: await resolverContext.bean(query),
                        enumerable: property.enumerable,
                        writable: !property.readonly
                    }
                );
            } catch (err) {
                if (err instanceof BeanDefinitionNotFoundError) {
                    if (property.enableDefault !== true) {
                        throw new PropertyDefaultValueNotEnabledError(constructor, property.name, query);
                    }
                } else {
                    throw err;
                }
            }
        }
        return instance;
    }
}
