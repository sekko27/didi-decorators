import { IPredicate } from "../../didi-predicates/IPredicate.ts";
import { IBeanDefinition } from "./definition/IBeanDefinition.ts";

export interface IBeanCollection {
    filter<B>(query: IPredicate<IBeanDefinition<B>>): Promise<IBeanDefinition<B>[]>;
}
