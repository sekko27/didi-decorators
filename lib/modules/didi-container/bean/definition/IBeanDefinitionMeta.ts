import { BeanType } from "../../../didi-commons/BeanType.ts";
import { IBeanDefinitionTags } from "./IBeanDefinitionTags.ts";

export interface IBeanDefinitionMeta<T> {
    readonly type: BeanType<T>;
    readonly tags: IBeanDefinitionTags;
    // TODO Check this
    readonly optional: boolean;
}
