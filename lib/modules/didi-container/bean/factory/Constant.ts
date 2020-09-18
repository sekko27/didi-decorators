import { IBeanFactory } from "./IBeanFactory.ts";
import { BeanType } from "../../../didi-commons/BeanType.ts";
import { IBeanResolver } from "../IBeanResolver.ts";
import { IBean } from "../IBean.ts";

export class Constant<T> implements IBeanFactory<T> {
    constructor(
        private readonly type: BeanType<T>,
        private readonly value: T | Promise<T>,
    ) {
    }

    async create(beanProvider: IBeanResolver): Promise<IBean<T>> {
        return {
            value: await this.value
        };
    }
}
