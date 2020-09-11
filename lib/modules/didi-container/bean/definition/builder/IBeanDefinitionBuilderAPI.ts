import { IBeanDefinitionBuilder } from "./IBeanDefinitionBuilder.ts";
import { BeanType } from "../../../../didi-commons/BeanType.ts";
import { ITagsPredicate } from "../../../../didi-tags/types/ITagsPredicate.ts";
import { ConstantPredicate } from "../../../../didi-predicates/ConstantPredicate.ts";
import { Name } from "../../../../didi-commons/Name.ts";

export interface IBeanDefinitionBuilderAPI<T> {
    supply(supplier: () => T | Promise<T>): IBeanDefinitionBuilder<T>;
    constant(value: T | Promise<T>): IBeanDefinitionBuilder<T>;
    factory<F extends {create(...args: any[]): T | Promise<T>}>(factoryClass: BeanType<F>, method?: Name, tagsPredicate?: ITagsPredicate): IBeanDefinitionBuilder<T>;
    instanceOf(): IBeanDefinitionBuilder<T>;

}
