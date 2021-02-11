import { IBeanDefinitionBuilder } from "../interfaces/IBeanDefinitionBuilder.ts";
import { BeanType } from "../../../../../didi-commons/lib/types/BeanType.ts";
import { ParameterizedBeanDefinitionBuilder } from "../base/ParameterizedBeanDefinitionBuilder.ts";
import { IBeanFactory } from "../interfaces/IBeanFactory.ts";
import { IParamListResolver } from "../../param/interfaces/IParamListResolver.ts";
import { Factory } from "./Factory.ts";

export class InstanceOfBeanDefinitionBuilder<T> extends ParameterizedBeanDefinitionBuilder<T> implements IBeanDefinitionBuilder<T> {
    constructor(type: BeanType<T>, paramListResolver: IParamListResolver) {
        super(type, paramListResolver);
    }

    protected createFactory(): IBeanFactory<T> {
        return new Factory(this.type);
    }


}
