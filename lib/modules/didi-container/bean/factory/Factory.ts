import { IBeanFactory } from "./IBeanFactory.ts";
import { BeanType } from "../../../didi-commons/BeanType.ts";
import { IBeanResolver } from "../IBeanResolver.ts";
import { IBean } from "../IBean.ts";
import { BeanFactoryClass } from "./BeanFactoryClass.ts";
import { TaggedTypeQuery } from "../../../didi-tags/TaggedTypeQuery.ts";
import { IParamDecoratorMetadata } from "../../../../decorators/param/IParamDecoratorMetadata.ts";
import { ParamDecorators } from "../../../../decorators/param/ParamDecorators.ts";
import { Name } from "../../../didi-commons/Name.ts";

export class Factory<T, K extends string, F extends BeanFactoryClass<K, T>> implements IBeanFactory<T> {
    constructor(
        private readonly type: BeanType<T>,
        private readonly query: TaggedTypeQuery<F>,
        private readonly method: K,
    ) {
    }

    async create(beanProvider: IBeanResolver): Promise<IBean<T>> {
        const factoryBean = await beanProvider.getBean(this.query);
        const paramMetadata: IParamDecoratorMetadata<any>[] = ParamDecorators.methodParams(
            factoryBean.constructor.prototype,
            this.method
        );
        const params = await beanProvider.resolveParams(paramMetadata);
        return {
            value: await factoryBean.value[this.method](...params)
        };
    }
}
