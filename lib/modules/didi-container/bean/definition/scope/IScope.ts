import { IBeanResolverContext, IFactoryResolverContext } from "../builder/interfaces/IBeanResolverForFactory.ts";

export interface IScope<T> {
    get(factoryResolverContext: IFactoryResolverContext<T>, beanResolverContext: IBeanResolverContext): Promise<T>;
}
