import { IBeanFactory } from "./IBeanFactory.ts";
import { BeanType } from "../../../didi-commons/BeanType.ts";
import { IBeanResolver } from "../IBeanResolver.ts";
import { IBean } from "../IBean.ts";
import { BeanFactoryClass } from "./BeanFactoryClass.ts";
import { IParamDecoratorMetadata } from "../../../../decorators/param/IParamDecoratorMetadata.ts";
import { ParamDecorators } from "../../../../decorators/param/ParamDecorators.ts";
import { Name } from "../../../didi-commons/Name.ts";
import { ITagsQuery } from "../../../didi-queries/interfaces/ITagsQuery.ts";
import { IQuery } from "../../../didi-queries/interfaces/IQuery.ts";

export class Factory<T, K extends string, F extends BeanFactoryClass<K, T>> implements IBeanFactory<T> {
    constructor(
        private readonly type: BeanType<T>,
        private readonly query: IQuery<F>,
        private readonly method: K,
    ) {
    }

    async create(beanProvider: IBeanResolver): Promise<IBean<T>> {
        const factoryBean = await beanProvider.resolve(this.query);
        const paramMetadata: IParamDecoratorMetadata<any>[] = ParamDecorators.methodParams(
            factoryBean.constructor.prototype,
            this.method
        );
        const params = await beanProvider.resolveParams(paramMetadata);
        return {
            value: await factoryBean.value[this.method](...params)
        };
    }
}

interface IResolverContext {
    resolveBean(...);
    resolveParamList(...);
}
class C {
    boot() {
        const definitionFactories = builders.map(b => b.build());
        const beanResolver = new BeanResolver(definitions);
        const paramResolver = new PR();

        definitionFactories.filter(f => !f.optional).map(f => {
            const beanDefinition = f.create(beanResolver, paramResolver);
            const bean = beanDefinition.resolve();
            const resolverContext = new ResolverContext(beanResolve, paramResolver, d);
            resolverContext.resolve()

        })
    }
}
