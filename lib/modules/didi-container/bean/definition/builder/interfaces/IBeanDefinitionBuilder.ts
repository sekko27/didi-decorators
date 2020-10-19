import { IBeanDefinition } from "../../IBeanDefinition.ts";
import { IBeanDefinitionMeta } from "../../IBeanDefinitionMeta.ts";

export interface IBeanDefinitionBuilder<T> {
    build(): IBeanDefinition<T>;
    readonly meta: IBeanDefinitionMeta<T>;
}
