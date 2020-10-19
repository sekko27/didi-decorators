import { IQuery } from "../../../../../didi-queries/interfaces/IQuery.ts";
import { IParamDecoratorMetadata } from "../../../../../../decorators/param/IParamDecoratorMetadata.ts";
import { IParamListResolverContext } from "../../param/interfaces/IParamListResolverContext.ts";
import { IParamListResolver } from "../../param/interfaces/IParamListResolver.ts";
import { IReadonlyActivationHandlerChain } from "../../activation-handler/ActivationHandlerChain.ts";
import { IBeanFactory } from "./IBeanFactory.ts";
import { IBeanDefinitionResolver } from "./IBeanDefinitionResolver.ts";
import { IScope } from "../../scope/IScope.ts";

export interface IFactoryResolverContext<T> extends IBeanDefinitionResolver<T> {
    bean<B>(query: IQuery<B>): Promise<B>;
    paramList(parametersMetadata: IParamDecoratorMetadata<any>[]): Promise<any[]>;
    createNewInstance<B>(): Promise<B>;
}

export class FactoryResolverContext<T> implements IFactoryResolverContext<T> {
    constructor(
        private readonly scope: IScope<T>,
        private readonly factory: IBeanFactory<T>,
        private readonly beanResolver: IBeanResolver,
        private readonly paramListResolver: IParamListResolver,
        private readonly paramListResolverContext: IParamListResolverContext,
    ) {
    }

    async bean<B>(query: IQuery<B>): Promise<B> {
        return this.beanResolver.resolve(query);
    }

    paramList(parametersMetadata: IParamDecoratorMetadata<any>[]): Promise<any[]> {
        return this.paramListResolver.resolve(parametersMetadata, this.beanResolver, this.paramListResolverContext);
    }

    async createNewInstance<B>(): Promise<B> {
        return this.beanResolver.activationHandler.apply(await this.factory.create(this) as any, this);
    }

    resolve(): Promise<T> {
        return this.scope.get(this);
    }


}

export interface IBeanResolver {
    /**
     *
     * @param query
     */
    resolve<B>(query: IQuery<B>): Promise<B>;
    readonly activationHandler: IReadonlyActivationHandlerChain;
}
