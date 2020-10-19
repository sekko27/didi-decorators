import { IParamDecoratorMetadata } from "../../../../../../decorators/param/IParamDecoratorMetadata.ts";
import { IParamListResolverContext } from "../interfaces/IParamListResolverContext.ts";

export class ParamListResolverError extends Error {
    constructor(
        message: string,
        readonly parameterMetadata: IParamDecoratorMetadata<any>,
        readonly context: IParamListResolverContext,
        readonly cause?: Error
    ) {
            super(message);
    }

    /**
     * @throws ParamListResolverError
     */
    public static nonResolvable(parameterMetadata: IParamDecoratorMetadata<any>, context: IParamListResolverContext): ParamListResolverError {
        return new this(`No matching param list resolver`, parameterMetadata, context);
    }
}
