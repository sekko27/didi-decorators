import { IScope } from "./IScope.ts";
import { IBean } from "../IBean.ts";
import { IBeanFactory } from "../factory/IBeanFactory.ts";
import { IBeanResolver } from "../IBeanResolver.ts";

export class Prototype<T> implements IScope<T>{
    get(factory: IBeanFactory<T>, beanProvider: IBeanResolver): Promise<IBean<T>> {
        return factory.create(beanProvider);
    }
}
