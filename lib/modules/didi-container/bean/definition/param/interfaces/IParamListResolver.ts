import { IParamDecoratorMetadata } from "../../../../../../decorators/param/IParamDecoratorMetadata.ts";
import { IParamListResolverContext } from "./IParamListResolverContext.ts";
import { IBeanResolverContext, IBeanResolverForFactory } from "../../builder/interfaces/IBeanResolverForFactory.ts";

export interface IParamListResolver {
    resolve(
        paramMetadata: IParamDecoratorMetadata<any>[],
        beanResolver: IBeanResolverForFactory,
        context: IParamListResolverContext,
        beanResolverContext: IBeanResolverContext,
    ): Promise<any[]>;
}
