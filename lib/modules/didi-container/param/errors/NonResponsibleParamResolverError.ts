import { ParamListResolverError } from "./ParamListResolverError.ts";
import { IParamDecoratorMetadata } from "../../../../decorators/param/IParamDecoratorMetadata.ts";
import { IParamListResolverContext } from "../interfaces/IParamListResolverContext.ts";

export class NonResponsibleParamResolverError extends Error {
    public static responsible(error: Error) {
        return ! (error instanceof NonResponsibleParamResolverError);
    }

    public static rethrowIfResponsible(error: Error, parameterMetadata: IParamDecoratorMetadata<any>, context: IParamListResolverContext) {
        if (this.responsible(error)) {
            throw new ParamListResolverError(`Param resolver fatal error`, parameterMetadata, context, error);
        }
    }
}
