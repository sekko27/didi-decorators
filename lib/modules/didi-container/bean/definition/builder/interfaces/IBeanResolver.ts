import { IBean } from "../../../IBean.ts";
import { IQuery } from "../../../../../didi-queries/interfaces/IQuery.ts";
import { IParamDecoratorMetadata } from "../../../../../../decorators/param/IParamDecoratorMetadata.ts";
import { IParamListResolverContext } from "../../param/interfaces/IParamListResolverContext.ts";
import { IParamListResolver } from "../../param/interfaces/IParamListResolver.ts";
import { ActivationHandlerChain } from "../../activation-handler/ActivationHandlerChain.ts";
import { IReadonlyActivationHandlerChain } from "../../activation-handler/ActivationHandlerChain.ts";
import { IBeanFactory } from "./IBeanFactory.ts";

export interface IFactoryResolverContext {
    bean<B>(query: IQuery<B>): Promise<B>;
    paramList(parametersMetadata: IParamDecoratorMetadata<any>[]): Promise<any[]>;
    createNewInstance<B>(factory: IBeanFactory<B>): Promise<B>;
    // applyActivationHandlers<T extends ObjectConstructor>(instance: T): Promise<T>;
}

export class FactoryResolverContext implements IFactoryResolverContext {
    constructor(
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

    async createNewInstance<B>(factory: IBeanFactory<B>): Promise<B> {
        return this.beanResolver.activationHandler.apply(await factory.create(this) as any, this);
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
