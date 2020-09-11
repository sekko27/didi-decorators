import { IBeanFactory } from "./IBeanFactory.ts";
import { BeanType } from "../../../didi-commons/BeanType.ts";
import { IBeanProvider } from "../IBeanProvider.ts";
import { IBean } from "../IBean.ts";
import { IParamDecoratorMetadata } from "../../../../decorators/param/IParamDecoratorMetadata.ts";
import { ParamDecorators } from "../../../../decorators/param/ParamDecorators.ts";

export class InstanceOf<T> implements IBeanFactory<T> {
    constructor(
        private readonly type: BeanType<T>,
    ) {
    }

    async create(beanProvider: IBeanProvider): Promise<IBean<T>> {
        const paramMetadata: IParamDecoratorMetadata<any>[] = ParamDecorators.methodParams(this.type, undefined);
        const params = await beanProvider.resolveParams(paramMetadata);
        return {
            value: new (this.type)(...params) as T
        };
    }
}
