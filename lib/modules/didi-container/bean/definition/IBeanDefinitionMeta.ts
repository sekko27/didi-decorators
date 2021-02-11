import { BeanType } from "../../../didi-commons/lib/types/BeanType.ts";
import { IBeanDefinitionTags } from "./IBeanDefinitionTags.ts";

export interface IBeanDefinitionMeta<T> {
    readonly type: BeanType<T>;
    readonly tags: IBeanDefinitionTags;
    // TODO Check this
    readonly optional: boolean;
}
