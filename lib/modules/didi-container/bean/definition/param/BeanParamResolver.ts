import { IParamResolver } from "./interfaces/IParamResolver.ts";
import { IParamDecoratorMetadata } from "../../../../../decorators/param/IParamDecoratorMetadata.ts";
import { IParamListResolverContext } from "./interfaces/IParamListResolverContext.ts";
import { IBeanResolver } from "../builder/interfaces/IBeanResolver.ts";
import { IQuery } from "../../../../didi-queries/interfaces/IQuery.ts";

export class BeanParamResolver implements IParamResolver {
    async resolve(paramMetadata: IParamDecoratorMetadata<any>, context: IParamListResolverContext, beanResolver: IBeanResolver): Promise<any> {
        const qualifier = context.qualifiers.has(paramMetadata.paramName)
            ? paramMetadata.query.merge(context.qualifiers.get(paramMetadata.paramName) as IQuery<any>)
            : paramMetadata.query;

        const query = paramMetadata.query.merge(qualifier);
        return beanResolver.resolve(query);
    }
}
