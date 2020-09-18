import { IParamResolver } from "./interfaces/IParamResolver.ts";
import { IParamDecoratorMetadata } from "../../../decorators/param/IParamDecoratorMetadata.ts";
import { IParamListResolverContext } from "./interfaces/IParamListResolverContext.ts";
import { NonResponsibleParamResolverError } from "./errors/NonResponsibleParamResolverError.ts";
import { TypeSupport } from "../../didi-commons/TypeSupport.ts";
import { ParamResolverError } from "./errors/ParamResolverError.ts";

export class QualifiedBeanParamResolver implements IParamResolver {
    async resolve(paramMetadata: IParamDecoratorMetadata<any>, context: IParamListResolverContext): Promise<any> {
        const qualifier = context.qualifiers.getOrThrow(
            paramMetadata.target,
            paramMetadata.methodName,
            paramMetadata.paramName,
            () => new NonResponsibleParamResolverError()
        );
        const query = paramMetadata.query.merge(qualifier);
        return context.beanResolver.resolve(query);
    }
}
