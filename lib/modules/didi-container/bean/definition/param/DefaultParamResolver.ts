import { IParamResolver } from "./interfaces/IParamResolver.ts";
import {
    IParamDecoratorMetadata,
    StringifyParamDecoratorMetadata
} from "../../../../../decorators/param/IParamDecoratorMetadata.ts";
import { NonResponsibleParamResolverError } from "./errors/NonResponsibleParamResolverError.ts";
import { TypeSupport } from "../../../../didi-commons/lib/utils/TypeSupport.ts";

export class DefaultParamResolver implements IParamResolver {
    async resolve(paramMetadata: IParamDecoratorMetadata<any>): Promise<any> {
        if (TypeSupport.isDefaultParam(paramMetadata.target.prototype, paramMetadata.methodName, paramMetadata.index)) {
            return undefined;
        }
        throw new NonResponsibleParamResolverError(new Error(`Parameter "${StringifyParamDecoratorMetadata(paramMetadata)}" is not a default param`));
    }
}
