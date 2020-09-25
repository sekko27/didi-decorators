import { IBeanResolver } from "../IBeanResolver.ts";
import { IBean } from "../IBean.ts";
import { IParamListResolver } from "../../param/interfaces/IParamListResolver.ts";

export interface IBeanFactory<T> {
    create(beanResolver: IBeanResolver, paramResolver: IParamListResolver): Promise<IBean<T>>;
}
