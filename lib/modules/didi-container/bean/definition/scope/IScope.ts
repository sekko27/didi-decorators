import { IBeanResolver, IFactoryResolverContext } from "../builder/interfaces/IBeanResolver.ts";
import { IBean } from "../../IBean.ts";
import { IBeanFactory } from "../builder/interfaces/IBeanFactory.ts";

export interface IScope<T> {
    get(factory: IBeanFactory<T>, factoryResolverContext: IFactoryResolverContext): Promise<T>;
}
