import { IBeanFactory } from "../factory/IBeanFactory.ts";
import { IBeanResolver } from "../IBeanResolver.ts";
import { IBean } from "../IBean.ts";

export interface IScope<T> {
    get(factory: IBeanFactory<T>, beanProvider: IBeanResolver): Promise<IBean<T>>;
}
