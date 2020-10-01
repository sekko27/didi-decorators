import { BeanType } from "../../../../../didi-commons/BeanType.ts";
import { SupplyBeanDefinitionBuilder } from "./SupplyBeanDefinitionBuilder.ts";
import { ConstantBeanDefinitionBuilder } from "./ConstantBeanDefinitionBuilder.ts";
import { FactoryBeanDefinitionBuilder } from "./FactoryBeanDefinitionBuilder.ts";
import { InstanceOfBeanDefinitionBuilder } from "./InstanceOfBeanDefinitionBuilder.ts";
import { BeanFactoryClass } from "../interfaces/BeanFactoryClass.ts";

export interface IBeanDefinitionBuilderAPI<T> {
    supply(supplier: () => T | Promise<T>): SupplyBeanDefinitionBuilder<T>;
    constant(value: T | Promise<T>): ConstantBeanDefinitionBuilder<T>;
    factory<K extends string, F extends BeanFactoryClass<K, T>>(factoryClass: BeanType<F>, method: K): FactoryBeanDefinitionBuilder<T, K, F>;
    instanceOf(): InstanceOfBeanDefinitionBuilder<T>;

}
