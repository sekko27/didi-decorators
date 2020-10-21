import { IQuery } from "../../../../../didi-queries/interfaces/IQuery.ts";
import { IParamDecoratorMetadata } from "../../../../../../decorators/param/IParamDecoratorMetadata.ts";
import { IParamListResolverContext } from "../../param/interfaces/IParamListResolverContext.ts";
import { IParamListResolver } from "../../param/interfaces/IParamListResolver.ts";
import { IReadonlyActivationHandlerChain } from "../../activation-handler/ActivationHandlerChain.ts";
import { IBeanFactory } from "./IBeanFactory.ts";
import { IBeanDefinitionResolver } from "./IBeanDefinitionResolver.ts";
import { IScope } from "../../scope/IScope.ts";
import { IStringifiable } from "../../../../../didi-commons/IStringifiable.ts";

export interface IFactoryResolverContext<T> extends IBeanDefinitionResolver<T> {
    bean<B>(query: IQuery<B>, context: IBeanResolverContext): Promise<B>;
    paramList(parametersMetadata: IParamDecoratorMetadata<any>[], context: IBeanResolverContext): Promise<any[]>;
    createNewInstance<B>(beanResolverContext: IBeanResolverContext): Promise<B>;
}

// TODO Move to proper place
export class FactoryResolverContext<T> implements IFactoryResolverContext<T> {
    constructor(
        private readonly scope: IScope<T>,
        private readonly factory: IBeanFactory<T>,
        private readonly beanResolver: IBeanResolverForFactory,
        private readonly paramListResolver: IParamListResolver,
        private readonly paramListResolverContext: IParamListResolverContext,
    ) {
    }

    async bean<B>(query: IQuery<B>, context: IBeanResolverContext): Promise<B> {
        return this.beanResolver.resolve(query, context);
    }

    paramList(parametersMetadata: IParamDecoratorMetadata<any>[], beanResolverContext: IBeanResolverContext): Promise<any[]> {
        return this.paramListResolver.resolve(parametersMetadata, this.beanResolver, this.paramListResolverContext, beanResolverContext);
    }

    async createNewInstance<B>(beanResolverContext: IBeanResolverContext): Promise<B> {
        return this.beanResolver.activationHandler.apply(await this.factory.create(this, beanResolverContext) as any, this, beanResolverContext);
    }

    resolve(context: IBeanResolverContext): Promise<T> {
        return this.scope.get(this, context);
    }


}

export interface IBeanResolverForClient {
    bean<B>(query: IQuery<B>): Promise<B>;
}

export interface IBeanResolverContext extends IStringifiable {
    next(query: IQuery<any>): IBeanResolverContext;
}

export interface IBeanResolverForFactory {
    resolve<B>(query: IQuery<B>, context: IBeanResolverContext): Promise<B>;
    readonly activationHandler: IReadonlyActivationHandlerChain;
}
