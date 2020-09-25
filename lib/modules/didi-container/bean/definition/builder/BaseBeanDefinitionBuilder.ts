import { assert } from "https://deno.land/std/testing/asserts.ts";
import { IScope } from "../../scope/IScope.ts";
import { IBeanDefinition } from "../IBeanDefinition.ts";
import { Singleton } from "../../scope/Singleton.ts";
import { Name } from "../../../../didi-commons/Name.ts";
import { IBeanFactory } from "../../factory/IBeanFactory.ts";
import { BeanType } from "../../../../didi-commons/BeanType.ts";
import { TagDecorator } from "../../../../../decorators/tag/TagDecorator.ts";
import { TagsQuery } from "../../../../didi-queries/TagsQuery.ts";
import { Prototype } from "../../scope/Prototype.ts";

export abstract class BaseBeanDefinitionBuilder<T, D extends IBeanDefinition<T>> {
    private readonly tags: Map<Name, any> = new Map();

    protected constructor(
        private readonly type: BeanType<T>,
        private readonly factory: IBeanFactory<T>,
        private scope: IScope<T> | undefined = undefined,
    ) {
    }

    build(): D {
        return {
            type: this.type,
            tags: TagDecorator.tags(this.type).merge(new TagsQuery(this.tags)),
            factory: this.factory,
            scope: this.scope === undefined ? new Singleton() : this.scope,
            ...this.buildCustom(),
        } as any;
    }

    protected abstract buildCustom(): Omit<D, keyof IBeanDefinition<T>> & Pick<IBeanDefinition<T>, "params" | "qualifiers">

    singleton(): this {
        return this.setScope(new Singleton());
    }

    prototype(): this {
        return this.setScope(new Prototype());
    }

    private setScope(scope: IScope<T>): this {
        assert(this.scope === undefined, "Scope can be defined once at most");
        this.scope = scope;
        return this;
    }

    tag(tag: Name, value: any): this {
        this.tags.set(tag, value);
        return this;
    }
}
