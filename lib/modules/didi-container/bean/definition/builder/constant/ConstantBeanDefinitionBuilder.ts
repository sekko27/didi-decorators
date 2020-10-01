import { IBeanDefinitionBuilder } from "../interfaces/IBeanDefinitionBuilder.ts";
import { BeanType } from "../../../../../didi-commons/BeanType.ts";
import { BaseBeanDefinitionBuilder } from "../base/BaseBeanDefinitionBuilder.ts";
import { IBeanDefinitionResolverFactory } from "../interfaces/IBeanDefinitionResolverFactory.ts";
import { ConstantBeanDefinitionResolver } from "./ConstantBeanDefinitionResolver.ts";

export class ConstantBeanDefinitionBuilder<T> extends BaseBeanDefinitionBuilder<T> implements IBeanDefinitionBuilder<T> {
    constructor(type: BeanType<T>, private readonly value: T) {
        super(type);
    }

    protected resolverFactory(): IBeanDefinitionResolverFactory<T> {
        return () => new ConstantBeanDefinitionResolver(this.value);
    }
}
