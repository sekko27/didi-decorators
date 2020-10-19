import { BeanType } from "../../../../../didi-commons/BeanType.ts";
import { IBeanResolverContext, IFactoryResolverContext } from "../interfaces/IBeanResolverForFactory.ts";
import { IParamDecoratorMetadata } from "../../../../../../decorators/param/IParamDecoratorMetadata.ts";
import { ParamDecorators } from "../../../../../../decorators/param/ParamDecorators.ts";
import { IBeanFactory } from "../interfaces/IBeanFactory.ts";

export class Factory<T> implements IBeanFactory<T> {
    constructor(private readonly type: BeanType<T>) {
    }

    public async create(context: IFactoryResolverContext<T>, beanResolverContext: IBeanResolverContext): Promise<T> {
        const paramMetadata: IParamDecoratorMetadata<any>[] = ParamDecorators.methodParams(this.type, undefined);
        const params = await context.paramList(paramMetadata, beanResolverContext);
        return new (this.type)(...params) as T;
    }
}
