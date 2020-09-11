import { assert } from "https://deno.land/std/testing/asserts.ts";
import { IBeanDefinitionBuilder } from "./IBeanDefinitionBuilder.ts";
import { IScope } from "../../scope/IScope.ts";
import { IBeanDefinition } from "../IBeanDefinition.ts";
import { TaggedType } from "../../../../didi-tags/TaggedType.ts";
import { Singleton } from "../../scope/Singleton.ts";
import { Name } from "../../../../didi-commons/Name.ts";
import { IBeanFactory } from "../../factory/IBeanFactory.ts";

export class DefaultBeanDefinitionBuilder<T> implements IBeanDefinitionBuilder<T> {
    constructor(
        private readonly factory: IBeanFactory<T>,
        private readonly taggedType: TaggedType<T>,
        private scope: IScope<T> | undefined = undefined,
    ) {
    }

    setScope(scope: IScope<T>): this {
        assert(this.scope === undefined, "Scope can be defined once at most");
        this.scope = scope;
        return this;
    }


    build(): IBeanDefinition<T> {
        return {
            factory: this.factory,
            scope: this.scope === undefined ? new Singleton() : this.scope,
            taggedType: this.taggedType,
        };
    }

    tag(tag: Name, value: any): this {
        this.taggedType.tag(tag, value);
        return this;
    }
}
