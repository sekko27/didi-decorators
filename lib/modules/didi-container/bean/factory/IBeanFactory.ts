import { IBeanProvider } from "../IBeanProvider.ts";
import { IBean } from "../IBean.ts";

export interface IBeanFactory<T> {
    create(beanProvider: IBeanProvider): Promise<IBean<T>>;
}
