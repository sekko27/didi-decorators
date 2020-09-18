import { assert } from "https://deno.land/std/testing/asserts.ts";
import { IBeanDefinitionBuilder } from "./IBeanDefinitionBuilder.ts";
import { IScope } from "../../scope/IScope.ts";
import { IBeanDefinition } from "../IBeanDefinition.ts";
import { Singleton } from "../../scope/Singleton.ts";
import { Name } from "../../../../didi-commons/Name.ts";
import { IBeanFactory } from "../../factory/IBeanFactory.ts";
import { IParamListResolverContext } from "../../../param/interfaces/IParamListResolverContext.ts";
import { MethodParamMap } from "../../../param/MethodParamMap.ts";

export class DefaultBeanDefinitionBuilder<T> implements IBeanDefinitionBuilder<T> {
    private readonly paramResolverContext: IParamListResolverContext = {
        params: new MethodParamMap(),
        qualifiers: new MethodParamMap(),
    };

    constructor(
        private readonly factory: IBeanFactory<T>,
        private readonly taggedType: TaggedType<T>,
        private scope: IScope<T> | undefined = undefined,
    ) {
    }

    build(): IBeanDefinition<T> {
        return {
            factory: this.factory,
            scope: this.scope === undefined ? new Singleton() : this.scope,
            taggedType: this.taggedType,
            paramResolverContext: this.paramResolverContext,
        };
    }


    setScope(scope: IScope<T>): this {
        assert(this.scope === undefined, "Scope can be defined once at most");
        this.scope = scope;
        return this;
    }

    tag(tag: Name, value: any): this {
        this.taggedType.tag(tag, value);
        return this;
    }

    param(name: string, value: any): this {
        this.paramResolverContext.params.set(name, value);
        return this;
    }

    qualify(name: string, query: BeanDefinitionQuery<any>): this {
        this.paramResolverContext.qualifiers.set(name, query);
        return this;
    }
}
