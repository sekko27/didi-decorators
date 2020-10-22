import { BeanType } from "../../../../../didi-commons/BeanType.ts";
import { IBeanDefinitionTags, newBeanDefinitionTags } from "../../IBeanDefinitionTags.ts";
import { Name } from "../../../../../didi-commons/Name.ts";
import { IBeanDefinitionMeta } from "../../IBeanDefinitionMeta.ts";
import { IBeanDefinition } from "../../IBeanDefinition.ts";
import { IBeanDefinitionResolverFactory } from "../interfaces/IBeanDefinitionResolverFactory.ts";
import { ParamDecorators } from "../../../../../../decorators/param/ParamDecorators.ts";
import { TagDecorator } from "../../../../../../decorators/tag/TagDecorator.ts";
import { TagsQuery } from "../../../../../didi-queries/TagsQuery.ts";

export abstract class BaseBeanDefinitionBuilder<T> {
    private readonly tags: IBeanDefinitionTags = newBeanDefinitionTags();
    private required: boolean = true;
    private tagTargets: any[];

    protected constructor(readonly type: BeanType<T>) {
        this.tagTargets = [type];
    }

    public as(value: Name): this {
        return this.tag(ParamDecorators.NAME_TAG, value);
    }

    public tag(key: Name, value: any): this {
        this.tags.set(key, value);
        return this;
    }

    public optional(): this {
        this.required = false;
        return this;
    }

    public useTagsOn(target: any): this {
        this.tagTargets.push(target);
        return this;
    }

    get meta(): IBeanDefinitionMeta<T> {
        return {
            type: this.type,
            tags: this.calculateTags(),
            optional: !this.required,
        };
    }

    build(): IBeanDefinition<T> {
        return {
            meta: this.meta,
            resolverFactory: this.resolverFactory()
        }
    }

    private calculateTags(): IBeanDefinitionTags {
        const mergedMap = this.tagTargets.reduce(
            (memo, tagTarget) => {
                try {
                    return TagDecorator.tags(tagTarget).merge(memo);
                } catch (err) {
                    console.error(`Unable to merge tags using tag target "${tagTarget}. Using client defined tags only.`);
                    return memo;

                }
            },
            new TagsQuery(this.tags)
        );
        return newBeanDefinitionTags(mergedMap.entries());
    }

    protected abstract resolverFactory(): IBeanDefinitionResolverFactory<T>;
}
