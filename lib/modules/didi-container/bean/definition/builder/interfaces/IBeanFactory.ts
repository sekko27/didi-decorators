import { IFactoryResolverContext } from "./IBeanResolver.ts";

export interface IBeanFactory<T> {
    create(factoryResolverContext: IFactoryResolverContext): Promise<T>;
}
