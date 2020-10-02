import { IBeanDefinitionBuilderAPI } from "./IBeanDefinitionBuilderAPI.ts";
import { BeanType } from "../../../../../didi-commons/BeanType.ts";
import { BeanFactoryClass } from "../interfaces/BeanFactoryClass.ts";
import { ConstantBeanDefinitionBuilder } from "../constant/ConstantBeanDefinitionBuilder.ts";
import { FactoryBeanDefinitionBuilder } from "../factory/FactoryBeanDefinitionBuilder.ts";
import { IParamListResolver } from "../../param/interfaces/IParamListResolver.ts";
import { InstanceOfBeanDefinitionBuilder } from "../instanceOf/InstanceOfBeanDefinitionBuilder.ts";

export class DefaultBeanDefinitionBuilderAPI<T> implements IBeanDefinitionBuilderAPI<T> {
    constructor(
        private readonly type: BeanType<T>,
        private readonly paramListResolver: IParamListResolver
    ) {
    }

    constant(value: T): ConstantBeanDefinitionBuilder<T> {
        return new ConstantBeanDefinitionBuilder(this.type, value);
    }

    factory<K extends string, F extends BeanFactoryClass<K, T>>(factoryClass: BeanType<F>, method: K): FactoryBeanDefinitionBuilder<T, K, F> {
        return new FactoryBeanDefinitionBuilder(this.type, this.paramListResolver, factoryClass, method);
    }


    instanceOf(): InstanceOfBeanDefinitionBuilder<T> {
        return new InstanceOfBeanDefinitionBuilder(this.type, this.paramListResolver);
    }
}
