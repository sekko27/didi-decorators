import { IParamDecoratorMetadata } from "../../../../../../decorators/param/IParamDecoratorMetadata.ts";
import { IParamListResolverContext } from "./IParamListResolverContext.ts";
import { IBeanResolver } from "../../builder/interfaces/IBeanResolver.ts";

export interface IParamListResolver {
    resolve(
        paramMetadata: IParamDecoratorMetadata<any>[],
        beanResolver: IBeanResolver,
        context: IParamListResolverContext,
    ): Promise<any[]>;
}
