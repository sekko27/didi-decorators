import { IBeanResolverContext, IFactoryResolverContext } from "./IBeanResolverForFactory.ts";

export interface IBeanFactory<T> {
    create(factoryResolverContext: IFactoryResolverContext<T>, beanResolverContext: IBeanResolverContext): Promise<T>;
}
