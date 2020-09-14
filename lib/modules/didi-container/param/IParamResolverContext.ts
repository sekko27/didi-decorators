import { BeanDefinitionQuery } from "../bean/BeanDefinitionQuery.ts";

export interface IParamResolverContext {
    readonly params: Map<string, any>;
    readonly qualifiers: Map<string, BeanDefinitionQuery<any>>;
}
