import { IParamDecoratorMetadata } from "../../../../decorators/param/IParamDecoratorMetadata.ts";
import { IParamListResolverContext } from "./IParamListResolverContext.ts";

export interface IParamListResolver {
    resolve(paramMetadata: IParamDecoratorMetadata<any>[], context: IParamListResolverContext): Promise<any[]>;
}
