import { IParamResolver } from "./interfaces/IParamResolver.ts";
import { IParamDecoratorMetadata } from "../../../decorators/param/IParamDecoratorMetadata.ts";
import { IParamListResolverContext } from "./interfaces/IParamListResolverContext.ts";
import { NonResponsibleParamResolverError } from "./errors/NonResponsibleParamResolverError.ts";
import { TypeSupport } from "../../didi-commons/TypeSupport.ts";
import { ParamResolverError } from "./errors/ParamResolverError.ts";

export class DefaultParamResolver implements IParamResolver {
    async resolve(paramMetadata: IParamDecoratorMetadata<any>, context: IParamListResolverContext): Promise<any> {
        if (TypeSupport.isDefaultParam(paramMetadata.target, paramMetadata.methodName, paramMetadata.index)) {
            return undefined;
        }
        throw new NonResponsibleParamResolverError();
    }
}
