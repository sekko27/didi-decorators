import { BeanType } from "../../../../../didi-commons/lib/types/BeanType.ts";
import { BeanFactoryClass } from "../interfaces/BeanFactoryClass.ts";
import { ConstantBeanDefinitionBuilder } from "../constant/ConstantBeanDefinitionBuilder.ts";
import { FactoryBeanDefinitionBuilder } from "../factory/FactoryBeanDefinitionBuilder.ts";
import { InstanceOfBeanDefinitionBuilder } from "../instanceOf/InstanceOfBeanDefinitionBuilder.ts";

export interface IBeanDefinitionBuilderAPI<T> {
    constant(value: T | Promise<T>): ConstantBeanDefinitionBuilder<T>;
    factory<K extends string, F extends BeanFactoryClass<K, T>>(factoryClass: BeanType<F>, method: K): FactoryBeanDefinitionBuilder<T, K, F>;
    instanceOf(): InstanceOfBeanDefinitionBuilder<T>;
}
