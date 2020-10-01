import { IBeanDefinition } from "../../IBeanDefinition.ts";

export interface IBeanDefinitionBuilder<T> {
    build(): IBeanDefinition<T>;
}
