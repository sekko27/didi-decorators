import { IParamResolver } from "./interfaces/IParamResolver.ts";
import {
    IParamDecoratorMetadata,
    StringifyParamDecoratorMetadata
} from "../../../../../decorators/param/IParamDecoratorMetadata.ts";
import { IParamListResolverContext } from "./interfaces/IParamListResolverContext.ts";
import { NonResponsibleParamResolverError } from "./errors/NonResponsibleParamResolverError.ts";
import { TypeSupport } from "../../../../didi-commons/lib/utils/TypeSupport.ts";
import { ParamResolverError } from "./errors/ParamResolverError.ts";

export class ClientDefinedValueParamResolver implements IParamResolver {
    resolve(paramMetadata: IParamDecoratorMetadata<any>, context: IParamListResolverContext): Promise<any> {
        if (!context.values.has(paramMetadata.paramName)) {
            throw new NonResponsibleParamResolverError(new Error(`Context has not param value by name: "${StringifyParamDecoratorMetadata(paramMetadata)}"`));
        }
        const param = context.values.get(paramMetadata.paramName);
        if (!TypeSupport.subTypeOf(param?.constructor, paramMetadata.query.type)) {
            throw new ParamResolverError(
                `${StringifyParamDecoratorMetadata(paramMetadata)}: Expected "${paramMetadata.query.type?.name}" got "${param?.constructor}"`,
                paramMetadata,
                context,
            );
        }
        return param;
    }
}
