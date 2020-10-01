import { IBeanResolver } from "../../builder/interfaces/IBeanResolver.ts";
import { IQuery } from "../../../../../didi-queries/interfaces/IQuery.ts";

export interface IParamListResolverContext {
    readonly values: Map<string, any>;
    readonly qualifiers: Map<string, IQuery<any>>;
}
