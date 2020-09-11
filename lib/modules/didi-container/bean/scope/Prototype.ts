import { IScope } from "./IScope.ts";
import { IBean } from "../IBean.ts";
import { IBeanFactory } from "../factory/IBeanFactory.ts";
import { IBeanProvider } from "../IBeanProvider.ts";

export class Prototype<T> implements IScope<T>{
    get(factory: IBeanFactory<T>, beanProvider: IBeanProvider): Promise<IBean<T>> {
        return factory.create(beanProvider);
    }
}
