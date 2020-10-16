import { IFactoryResolverContext } from "./IBeanResolver.ts";

export interface IBeanFactory<T> {
    create(factoryResolverContext: IFactoryResolverContext<T>): Promise<T>;
}
