import { IParamResolver } from "./interfaces/IParamResolver.ts";
import { IParamDecoratorMetadata } from "../../../decorators/param/IParamDecoratorMetadata.ts";
import { IParamListResolverContext } from "./interfaces/IParamListResolverContext.ts";
import { NonResponsibleParamResolverError } from "./errors/NonResponsibleParamResolverError.ts";
import { TypeSupport } from "../../didi-commons/TypeSupport.ts";
import { ParamResolverError } from "./errors/ParamResolverError.ts";
import { BeanNotFoundResolutionError } from "../bean/errors/BeanNotFoundResolutionError.ts";

export class BeanParamResolver implements IParamResolver {
    async resolve(paramMetadata: IParamDecoratorMetadata<any>, context: IParamListResolverContext): Promise<any> {
        try {
            return context.beanResolver.resolve(paramMetadata.query);
        } catch (err) {
            throw err instanceof BeanNotFoundResolutionError
                ? new NonResponsibleParamResolverError(err.message)
                : err;
        }
    }
}
