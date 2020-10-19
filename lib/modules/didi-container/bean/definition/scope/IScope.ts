import { IFactoryResolverContext } from "../builder/interfaces/IBeanResolver.ts";

export interface IScope<T> {
    get(factoryResolverContext: IFactoryResolverContext<T>): Promise<T>;
}
