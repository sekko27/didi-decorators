import { IBeanResolver } from "../../bean/IBeanResolver.ts";
import { MethodParamMap } from "../MethodParamMap.ts";
import { IQuery } from "../../../didi-queries/interfaces/IQuery.ts";

export interface IParamListResolverContext {
    readonly beanResolver: IBeanResolver;
    readonly params: MethodParamMap;
    readonly qualifiers: MethodParamMap<IQuery<any>>;
}
