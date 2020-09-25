import { IBeanResolver } from "../../bean/IBeanResolver.ts";
import { IQuery } from "../../../didi-queries/interfaces/IQuery.ts";

export interface IParamListResolverContext {
    readonly beanResolver: IBeanResolver;
    readonly params: Map<string, any>;
    readonly qualifiers: Map<string, IQuery<any>>;
}
