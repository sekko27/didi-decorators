import { IBeanFactory } from "./IBeanFactory.ts";
import { BeanType } from "../../../didi-commons/BeanType.ts";
import { IBeanProvider } from "../IBeanProvider.ts";
import { IBean } from "../IBean.ts";

export class Supply<T> implements IBeanFactory<T> {
    constructor(
        private readonly type: BeanType<T>,
        private readonly supplier: () => T | Promise<T>,
    ) {
    }

    async create(beanProvider: IBeanProvider): Promise<IBean<T>> {
        return {
            value: await this.supplier()
        };
    }
}
