import { IParamResolver } from "./interfaces/IParamResolver.ts";
import { IParamDecoratorMetadata } from "../../../decorators/param/IParamDecoratorMetadata.ts";
import { IParamListResolverContext } from "./interfaces/IParamListResolverContext.ts";
import { NonResponsibleParamResolverError } from "./errors/NonResponsibleParamResolverError.ts";
import { TypeSupport } from "../../didi-commons/TypeSupport.ts";
import { ParamResolverError } from "./errors/ParamResolverError.ts";

export class ClientDefinedParamResolver implements IParamResolver {
    resolve(paramMetadata: IParamDecoratorMetadata<any>, context: IParamListResolverContext): Promise<any> {
        const param = context.params.getOrThrow(
            paramMetadata.target,
            paramMetadata.methodName,
            paramMetadata.paramName,
            () => new NonResponsibleParamResolverError(),
        );
        if (!TypeSupport.subTypeOf(param ?? param.constructor, paramMetadata.query.type)) {
            throw new ParamResolverError(
                `Expected "${paramMetadata.query.type?.name}" got "${param?.constructor}"`,
                paramMetadata,
                context,
            );
        }
        return param;
    }
}
