import { BeanType } from "../../../../../didi-commons/BeanType.ts";
import { IFactoryResolverContext } from "../interfaces/IBeanResolver.ts";
import { IParamDecoratorMetadata } from "../../../../../../decorators/param/IParamDecoratorMetadata.ts";
import { ParamDecorators } from "../../../../../../decorators/param/ParamDecorators.ts";
import { IBeanFactory } from "../interfaces/IBeanFactory.ts";
import { BeanFactoryClass } from "../interfaces/BeanFactoryClass.ts";
import { IQuery } from "../../../../../didi-queries/interfaces/IQuery.ts";

export class Factory<T, K extends string, F extends BeanFactoryClass<K, T>> implements IBeanFactory<T> {
    constructor(private readonly type: BeanType<T>, private readonly query: IQuery<F>, private readonly method: K) {
    }

    public async create(context: IFactoryResolverContext<T>): Promise<T> {
        const factoryBean = await context.bean(this.query);
        const paramMetadata: IParamDecoratorMetadata<any>[] = ParamDecorators.methodParams(
            factoryBean.constructor.prototype,
            this.method
        );
        const params = await context.paramList(paramMetadata);
        return await factoryBean[this.method](...params);
    }
}
