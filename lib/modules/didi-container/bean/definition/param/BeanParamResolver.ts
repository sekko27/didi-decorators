import { IParamResolver } from "./interfaces/IParamResolver.ts";
import { IParamDecoratorMetadata } from "../../../../../decorators/param/IParamDecoratorMetadata.ts";
import { IParamListResolverContext } from "./interfaces/IParamListResolverContext.ts";
import { IBeanResolver } from "../builder/interfaces/IBeanResolver.ts";
import { IQuery } from "../../../../didi-queries/interfaces/IQuery.ts";
import { BeanDefinitionNotFoundError } from "../../container/errors/BeanDefinitionNotFoundError.ts";
import { NonResponsibleParamResolverError } from "./errors/NonResponsibleParamResolverError.ts";

export class BeanParamResolver implements IParamResolver {
    async resolve(paramMetadata: IParamDecoratorMetadata<any>, context: IParamListResolverContext, beanResolver: IBeanResolver): Promise<any> {
        try {
            const qualifier = context.qualifiers.has(paramMetadata.paramName)
                ? paramMetadata.query.merge(context.qualifiers.get(paramMetadata.paramName) as IQuery<any>)
                : paramMetadata.query;

            const query = paramMetadata.query.merge(qualifier);
            return await beanResolver.resolve(query);
        } catch (err) {
            if (err instanceof BeanDefinitionNotFoundError) {
                throw new NonResponsibleParamResolverError();
            }
            throw err;
        }
    }
}
