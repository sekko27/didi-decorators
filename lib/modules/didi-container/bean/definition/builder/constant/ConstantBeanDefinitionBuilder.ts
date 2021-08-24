import { IBeanDefinitionBuilder } from "../interfaces/IBeanDefinitionBuilder.ts";
import { BeanType } from "../../../../../didi-commons/lib/types/BeanType.ts";
import { BaseBeanDefinitionBuilder } from "../base/BaseBeanDefinitionBuilder.ts";
import { IBeanDefinitionResolverFactory } from "../interfaces/IBeanDefinitionResolverFactory.ts";
import { FactoryResolverContext, IBeanResolverForFactory } from "../interfaces/IBeanResolverForFactory.ts";
import { Singleton } from "../../scope/Singleton.ts";
import { IParamListResolver } from "../../param/interfaces/IParamListResolver.ts";
import { IParamListResolverContext } from "../../param/interfaces/IParamListResolverContext.ts";

export class ConstantBeanDefinitionBuilder<T> extends BaseBeanDefinitionBuilder<T> implements IBeanDefinitionBuilder<T> {
    private static readonly PARAM_LIST_RESOLVER: IParamListResolver = {
        async resolve() {
            throw new Error(`Calling param resolution on constants`);
        }
    };

    private static readonly PARAM_LIST_RESOLVER_CONTEXT: IParamListResolverContext = {
        qualifiers: new Map(),
        values: new Map(),
    };

    constructor(type: BeanType<T>, private readonly value: T) {
        super(type);
    }

    protected resolverFactory(): IBeanDefinitionResolverFactory<T> {
        return (beanResolver: IBeanResolverForFactory) => new FactoryResolverContext(
            new Singleton(),
            { create: async () => this.value },
            beanResolver,
            ConstantBeanDefinitionBuilder.PARAM_LIST_RESOLVER,
            ConstantBeanDefinitionBuilder.PARAM_LIST_RESOLVER_CONTEXT
        );
    }
}
