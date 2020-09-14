import { IBeanDefinitionBuilderAPI } from "./IBeanDefinitionBuilderAPI.ts";
import { IBeanDefinitionBuilder } from "./IBeanDefinitionBuilder.ts";
import { BeanType } from "../../../../didi-commons/BeanType.ts";
import { DefaultBeanDefinitionBuilder } from "./DefaultBeanDefinitionBuilder.ts";
import { Supply } from "../../factory/Supply.ts";
import { TaggedType } from "../../../../didi-tags/TaggedType.ts";
import { Constant } from "../../factory/Constant.ts";
import { IBeanFactory } from "../../factory/IBeanFactory.ts";
import { IScope } from "../../scope/IScope.ts";
import { Singleton } from "../../scope/Singleton.ts";
import { ITagsPredicate } from "../../../../didi-tags/types/ITagsPredicate.ts";
import { InstanceOf } from "../../factory/InstanceOf.ts";
import { Name } from "../../../../didi-commons/Name.ts";
import { BeanFactoryClass } from "../../factory/BeanFactoryClass.ts";

export class DefaultBeanDefinitionBuilderAPI<T> implements IBeanDefinitionBuilderAPI<T> {
    constructor(
        private readonly type: BeanType<T>,
    ) {
    }

    constant(value: Promise<T> | T): IBeanDefinitionBuilder<T> {
        return this.createBuilder(new Constant(this.type, value), new Singleton());
    }

    factory<F extends BeanFactoryClass<T>>(
        factoryClass: BeanType<F>,
        method: Name = "create", tagsPredicate?: ITagsPredicate,
    ): IBeanDefinitionBuilder<T> {
        return undefined;
    }

    instanceOf(): IBeanDefinitionBuilder<T> {
        return this.createBuilder(new InstanceOf(this.type));
    }

    supply(supplier: () => (Promise<T> | T)): IBeanDefinitionBuilder<T> {
        return this.createBuilder(new Supply(this.type, supplier));
    }

    private createBuilder(factory: IBeanFactory<T>, scope?: IScope<T>): IBeanDefinitionBuilder<T> {
        return new DefaultBeanDefinitionBuilder(factory, new TaggedType<T>(this.type, new Map()), scope);
    }
}
