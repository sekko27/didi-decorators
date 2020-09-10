import { TaggedType } from "../../../didi-tags/TaggedType.ts";
import { IScope } from "./IScope.ts";
import { IBeanFactory } from "../IBeanFactory.ts";
import { IActivationHandler } from "../IActivationHandler.ts";
import { ILocalContext } from "./ILocalContext.ts";

export interface IBeanDefinition<T> {
    readonly taggedType: TaggedType<T>;
    readonly factory: IBeanFactory<T>;
    readonly scope: IScope<T>;
    readonly activationHandler: IActivationHandler;
    readonly context: ILocalContext;

}
