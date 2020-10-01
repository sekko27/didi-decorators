import { IParamDecoratorMetadata } from "../../../../../../decorators/param/IParamDecoratorMetadata.ts";
import { IParamListResolverContext } from "../interfaces/IParamListResolverContext.ts";

export class ParamResolverError extends Error {
    constructor(message: string, readonly paramMetadata: IParamDecoratorMetadata<any>, readonly context: IParamListResolverContext) {
        super(message);
    }
}
