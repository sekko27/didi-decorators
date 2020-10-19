import { IScope } from "./IScope.ts";
import { IBeanResolverContext, IFactoryResolverContext } from "../builder/interfaces/IBeanResolverForFactory.ts";

export class Prototype<T> implements IScope<T> {
    async get(factoryResolverContext: IFactoryResolverContext<T>, beanResolverContext: IBeanResolverContext): Promise<T> {
        return factoryResolverContext.createNewInstance(beanResolverContext);
    }
}
