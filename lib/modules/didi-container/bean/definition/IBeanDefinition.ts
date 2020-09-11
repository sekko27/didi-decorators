import { TaggedType } from "../../../didi-tags/TaggedType.ts";
import { IScope } from "../scope/IScope.ts";
import { IBeanFactory } from "../factory/IBeanFactory.ts";

export interface IBeanDefinition<T> {
    readonly taggedType: TaggedType<T>;
    readonly factory: IBeanFactory<T>;
    readonly scope: IScope<T>;

}
