import { IBeanResolver } from "../IBeanResolver.ts";
import { IBean } from "../IBean.ts";

export interface IBeanFactory<T> {
    create(beanProvider: IBeanResolver): Promise<IBean<T>>;
}
