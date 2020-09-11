import { IPredicate } from "../../didi-predicates/IPredicate.ts";
import { IBeanDefinition } from "../bean/definition/IBeanDefinition.ts";

export interface IParamResolverContext {
    readonly params: Map<string, any>;
    readonly qualifiers: Map<string, IPredicate<IBeanDefinition<any>>>;
}
