import { IParamListResolver } from "./interfaces/IParamListResolver.ts";
import { IParamListResolverContext } from "./interfaces/IParamListResolverContext.ts";
import { IParamDecoratorMetadata } from "../../../decorators/param/IParamDecoratorMetadata.ts";
import { NonResponsibleParamResolverError } from "./errors/NonResponsibleParamResolverError.ts";
import { ParamListResolverError } from "./errors/ParamListResolverError.ts";
import { IParamResolver } from "./interfaces/IParamResolver.ts";

/**
 * 1. Local param resolver
 * 1. Qualified bean resolver
 * 1. Bean resolver
 * 1. Default
 * 1. Chain -> error
 */
export class ParamListResolverChain implements IParamListResolver {
    constructor(private readonly resolvers: IParamResolver[]) {
    }

    async resolve(paramsMetadata: IParamDecoratorMetadata<any>[], context: IParamListResolverContext): Promise<any[]> {
        const resolvedParams = [];
        for (const paramMetadata of paramsMetadata) {
            resolvedParams.push(await this.resolveParam(paramMetadata, context));
        }
        return resolvedParams;
    }

    private resolveParam(paramMetadata: IParamDecoratorMetadata<any>, context: IParamListResolverContext): Promise<any> {
        for (const resolver of this.resolvers) {
            try {
                return resolver.resolve(paramMetadata, context);
            } catch (err) {
                NonResponsibleParamResolverError.rethrowIfResponsible(err, paramMetadata, context);
            }
        }
        throw ParamListResolverError.nonResolvable(paramMetadata, context);
    }
}
