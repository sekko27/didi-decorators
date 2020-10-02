import { IParamListResolver } from "./interfaces/IParamListResolver.ts";
import { IParamListResolverContext } from "./interfaces/IParamListResolverContext.ts";
import { IParamDecoratorMetadata } from "../../../../../decorators/param/IParamDecoratorMetadata.ts";
import { NonResponsibleParamResolverError } from "./errors/NonResponsibleParamResolverError.ts";
import { ParamListResolverError } from "./errors/ParamListResolverError.ts";
import { IParamResolver } from "./interfaces/IParamResolver.ts";
import { IBeanResolver } from "../builder/interfaces/IBeanResolver.ts";
import { ClientDefinedValueParamResolver } from "./ClientDefinedValueParamResolver.ts";
import { BeanParamResolver } from "./BeanParamResolver.ts";
import { DefaultParamResolver } from "./DefaultParamResolver.ts";

/**
 * 1. Local param resolver
 * 1. Bean resolver
 * 1. Default
 * 1. Chain -> error
 */
export class ParamListResolverChain implements IParamListResolver {
    private static DEFAULT_INSTANCE: IParamListResolver;

    public static getDefault(): IParamListResolver {
        if (this.DEFAULT_INSTANCE === undefined) {
            this.DEFAULT_INSTANCE = new ParamListResolverChain([
                new ClientDefinedValueParamResolver(),
                new BeanParamResolver(),
                new DefaultParamResolver()
            ]);
        }
        return this.DEFAULT_INSTANCE;
    }

    constructor(private readonly resolvers: IParamResolver[]) {
    }

    async resolve(paramsMetadata: IParamDecoratorMetadata<any>[], beanResolver: IBeanResolver, context: IParamListResolverContext): Promise<any[]> {
        const resolvedParams = [];
        for (const paramMetadata of paramsMetadata) {
            resolvedParams.push(await this.resolveParam(paramMetadata, beanResolver, context));
        }
        return resolvedParams;
    }

    private async resolveParam(paramMetadata: IParamDecoratorMetadata<any>, beanResolver: IBeanResolver, context: IParamListResolverContext): Promise<any> {
        for (const resolver of this.resolvers) {
            try {
                return await resolver.resolve(paramMetadata, context, beanResolver);
            } catch (err) {
                NonResponsibleParamResolverError.rethrowIfResponsible(err, paramMetadata, context);
            }
        }
        throw ParamListResolverError.nonResolvable(paramMetadata, context);
    }
}
