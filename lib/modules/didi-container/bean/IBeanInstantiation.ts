import { IBean } from "./IBean.ts";

export interface IBeanInstantiation<T> {
    count: number;
    bean: IBean<T>;
}
