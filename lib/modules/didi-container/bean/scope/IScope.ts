import { IBeanFactory } from "../factory/IBeanFactory.ts";
import { IBeanProvider } from "../IBeanProvider.ts";
import { IBean } from "../IBean.ts";

export interface IScope<T> {
    get(factory: IBeanFactory<T>, beanProvider: IBeanProvider): Promise<IBean<T>>;
}
