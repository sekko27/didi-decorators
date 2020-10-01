import { BeanType } from "../../../../../didi-commons/BeanType.ts";
import { IBeanDefinitionTags, newBeanDefinitionTags } from "../../IBeanDefinitionTags.ts";
import { Name } from "../../../../../didi-commons/Name.ts";
import { IBeanDefinitionMeta } from "../../IBeanDefinitionMeta.ts";
import { IBeanDefinition } from "../../IBeanDefinition.ts";
import { IBeanDefinitionResolverFactory } from "../interfaces/IBeanDefinitionResolverFactory.ts";

export abstract class BaseBeanDefinitionBuilder<T> {
    private readonly tags: IBeanDefinitionTags = newBeanDefinitionTags();
    private required: boolean = true;

    protected constructor(readonly type: BeanType<T>) {
    }

    public tag(key: Name, value: any): this {
        this.tags.set(key, value);
        return this;
    }

    public optional(): this {
        this.required = false;
        return this;
    }

    private get meta(): IBeanDefinitionMeta<T> {
        return {
            type: this.type,
            tags: this.tags,
            optional: !this.required,
        };
    }

    build(): IBeanDefinition<T> {
        return {
            meta: this.meta,
            resolverFactory: this.resolverFactory()
        }
    }

    protected abstract resolverFactory(): IBeanDefinitionResolverFactory<T>;
}
