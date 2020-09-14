import { IPredicate } from "../../didi-predicates/IPredicate.ts";
import { IBeanDefinition } from "./definition/IBeanDefinition.ts";

export type BeanDefinitionQuery<B> = IPredicate<IBeanDefinition<B>>;
