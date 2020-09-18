import { IScope } from "./IScope.ts";
import { IBean } from "../IBean.ts";
import { IBeanFactory } from "../factory/IBeanFactory.ts";
import { IBeanResolver } from "../IBeanResolver.ts";

export class Singleton<T> implements IScope<T>{
    private instance: Promise<IBean<T>> | undefined = undefined;

    get(factory: IBeanFactory<T>, beanProvider: IBeanResolver): Promise<IBean<T>> {
        if (this.instance === undefined) {
            this.instance = factory.create(beanProvider);
        }
        return this.instance;
    }

}
