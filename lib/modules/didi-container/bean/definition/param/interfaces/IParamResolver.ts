import { IParamDecoratorMetadata } from "../../../../../../decorators/param/IParamDecoratorMetadata.ts";
import { IParamListResolverContext } from "./IParamListResolverContext.ts";
import { IBeanResolverContext, IBeanResolverForFactory } from "../../builder/interfaces/IBeanResolverForFactory.ts";

export interface IParamResolver {
    resolve(paramMetadata: IParamDecoratorMetadata<any>, context: IParamListResolverContext, beanResolver: IBeanResolverForFactory, beanResolverContext: IBeanResolverContext): Promise<any>;
}
