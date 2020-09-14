import { IBeanDefinition } from "./definition/IBeanDefinition.ts";
import { BeanDefinitionQuery } from "./BeanDefinitionQuery.ts";

export interface IBeanDefinitionCollection {
    filter<B>(query: BeanDefinitionQuery<B>): Promise<IBeanDefinition<B>[]>;
}
