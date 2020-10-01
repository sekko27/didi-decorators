import { IParamDecoratorMetadata } from "../../../../../../decorators/param/IParamDecoratorMetadata.ts";
import { IParamListResolverContext } from "./IParamListResolverContext.ts";
import { IBeanResolver } from "../../builder/interfaces/IBeanResolver.ts";

export interface IParamResolver {
    resolve(paramMetadata: IParamDecoratorMetadata<any>, context: IParamListResolverContext, beanResolver: IBeanResolver): Promise<any>;
}
