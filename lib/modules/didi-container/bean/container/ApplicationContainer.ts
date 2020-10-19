import { IContainer } from "./IContainer.ts";
import { IBeanDefinitionRepository } from "./IBeanDefinitionRepository.ts";
import { IQuery } from "../../../didi-queries/interfaces/IQuery.ts";
import { IBean } from "../IBean.ts";
import { IBeanDefinition } from "../definition/IBeanDefinition.ts";
import { BeanDefinitionNotFoundError } from "./errors/BeanDefinitionNotFoundError.ts";
import { AmbiguousBeanDefinitionQueryError } from "./errors/AmbiguousBeanDefinitionQueryError.ts";
import { IParamListResolver } from "../definition/param/interfaces/IParamListResolver.ts";
import { IBeanDefinitionResolver } from "../definition/builder/interfaces/IBeanDefinitionResolver.ts";
import { IReadonlyActivationHandlerChain } from "../definition/activation-handler/ActivationHandlerChain.ts";
import { IBeanResolverContext } from "../definition/builder/interfaces/IBeanResolverForFactory.ts";
import { BeanResolverContext } from "./BeanResolverContext.ts";
import { Query } from "../../../didi-queries/Query.ts";
import { TagsQuery } from "../../../didi-queries/TagsQuery.ts";

interface ResolverMapEntry<T> {
    readonly beans: Set<IBean<any>>;
    readonly resolver: IBeanDefinitionResolver<T>;
}

export class ApplicationContainer implements IContainer {
    private readonly resolveMap: Map<IBeanDefinition<any>, ResolverMapEntry<any>> = new Map();

    constructor(
        private readonly beanDefinitionRepository: IBeanDefinitionRepository,
        private readonly paramListResolver: IParamListResolver,
        readonly activationHandler: IReadonlyActivationHandlerChain
    ) {
    }

    /**
     * Resolver for client.
     * @param query
     */
    async bean<B>(query: IQuery<B>): Promise<B> {
        return this.resolve(query, this.newBeanResolverContext());
    }

    /**
     * Resolver for factories.
     * @param query
     * @param context
     */
    async resolve<B>(query: IQuery<B>, context: IBeanResolverContext): Promise<B> {
        const nextBeanResolverContext = context.next(query);
        return this.resolveBeanDefinition(await this.beanDefinition(query, nextBeanResolverContext), nextBeanResolverContext);
    }

    private newBeanResolverContext(): IBeanResolverContext {
        return new BeanResolverContext();
    }

    private async resolveBeanDefinition<B>(beanDefinition: IBeanDefinition<B>, context: IBeanResolverContext): Promise<B> {
        if (!this.resolveMap.has(beanDefinition)) {
            // TODO Change this to specific IBeanResolverForFactory
            const resolver = beanDefinition.resolverFactory(this, this.paramListResolver);
            this.resolveMap.set(beanDefinition, {resolver, beans: new Set()});
        }
        const entry: ResolverMapEntry<B> = this.resolveMap.get(beanDefinition) as ResolverMapEntry<B>;
        const value = await entry.resolver.resolve(context);
        entry.beans.add({value});
        return value;
    }

    private async beanDefinition<B>(query: IQuery<B>, context: IBeanResolverContext): Promise<IBeanDefinition<B>> {
        const definitions = await this.beanDefinitions(query);
        if (definitions.length === 0) {
            throw new BeanDefinitionNotFoundError(context);
        } else if (definitions.length > 1) {
            throw new AmbiguousBeanDefinitionQueryError(query, definitions);
        } else {
            return definitions[0];
        }
    }

    private beanDefinitions<B>(query: IQuery<B>): Promise<IBeanDefinition<B>[]> {
        return this.beanDefinitionRepository.get(query);
    }

    async boot(): Promise<this> {
        for (const bd of this.beanDefinitionRepository) {
            await this.resolveBeanDefinition(bd, this.newBeanResolverContext().next(new Query(bd.meta.type, new TagsQuery(bd.meta.tags))));
        }
        return this;
    }


}
