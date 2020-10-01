import { IBeanDefinitionBuilderAPI } from "./IBeanDefinitionBuilderAPI.ts";
import { BeanType } from "../../../../../didi-commons/BeanType.ts";
import { BeanFactoryClass } from "../interfaces/BeanFactoryClass.ts";
import { FactoryBeanDefinitionBuilder } from "./FactoryBeanDefinitionBuilder.ts";
import { ConstantBeanDefinitionBuilder } from "./ConstantBeanDefinitionBuilder.ts";
import { InstanceOfBeanDefinitionBuilder } from "./InstanceOfBeanDefinitionBuilder.ts";
import { SupplyBeanDefinitionBuilder } from "./SupplyBeanDefinitionBuilder.ts";

export class DefaultBeanDefinitionBuilderAPI<T> implements IBeanDefinitionBuilderAPI<T> {
    constructor(
        private readonly type: BeanType<T>,
    ) {
    }

    constant(value: Promise<T> | T): ConstantBeanDefinitionBuilder<T> {
        return new ConstantBeanDefinitionBuilder(this.type, value);
    }

    factory<K extends string, F extends BeanFactoryClass<K, T>>(factoryClass: BeanType<F>, method: K): FactoryBeanDefinitionBuilder<T, K, F> {
        return new FactoryBeanDefinitionBuilder(this.type, factoryClass, method);
    }


    instanceOf(): InstanceOfBeanDefinitionBuilder<T> {
        return new InstanceOfBeanDefinitionBuilder(this.type);
    }

    supply(supplier: () => (Promise<T> | T)): SupplyBeanDefinitionBuilder<T> {
        return new SupplyBeanDefinitionBuilder(this.type, supplier);
    }
}
