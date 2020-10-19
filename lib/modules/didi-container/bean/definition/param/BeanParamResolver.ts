import { IParamResolver } from "./interfaces/IParamResolver.ts";
import {
    IParamDecoratorMetadata,
    StringifyParamDecoratorMetadata
} from "../../../../../decorators/param/IParamDecoratorMetadata.ts";
import { IParamListResolverContext } from "./interfaces/IParamListResolverContext.ts";
import { IBeanResolverContext, IBeanResolverForFactory } from "../builder/interfaces/IBeanResolverForFactory.ts";
import { IQuery } from "../../../../didi-queries/interfaces/IQuery.ts";
import { BeanDefinitionNotFoundError } from "../../container/errors/BeanDefinitionNotFoundError.ts";
import { NonResponsibleParamResolverError } from "./errors/NonResponsibleParamResolverError.ts";

class UnableToResolveParamBeanError extends Error {
    constructor(paramMetadata: IParamDecoratorMetadata<any>, cause: BeanDefinitionNotFoundError) {
        super(`Unable to resolve param bean for ${StringifyParamDecoratorMetadata(paramMetadata)}: ${cause.message}`);
    }
}
export class BeanParamResolver implements IParamResolver {
    async resolve(paramMetadata: IParamDecoratorMetadata<any>, context: IParamListResolverContext, beanResolver: IBeanResolverForFactory, beanResolverContext: IBeanResolverContext): Promise<any> {
        try {
            const qualifier = context.qualifiers.has(paramMetadata.paramName)
                ? paramMetadata.query.merge(context.qualifiers.get(paramMetadata.paramName) as IQuery<any>)
                : paramMetadata.query;

            const query = paramMetadata.query.merge(qualifier);
            return await beanResolver.resolve(query, beanResolverContext);
        } catch (err) {
            if (err instanceof BeanDefinitionNotFoundError) {
                throw new NonResponsibleParamResolverError(new UnableToResolveParamBeanError(paramMetadata, err));
            }
            throw err;
        }
    }
}
