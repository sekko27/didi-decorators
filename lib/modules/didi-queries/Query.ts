import { IQuery } from "./interfaces/IQuery.ts";
import { BeanType } from "../didi-commons/BeanType.ts";
import { ITagsQuery } from "./interfaces/ITagsQuery.ts";
import { TagsQuery } from "./TagsQuery.ts";
import { IBeanDefinitionMeta } from "../didi-container/bean/definition/IBeanDefinitionMeta.ts";
import { TypeSupport } from "../didi-commons/TypeSupport.ts";
import { Name } from "../didi-commons/Name.ts";

export class Query<T> implements IQuery<T> {
    public static byName(name: Name): IQuery<any> {
        return new Query(undefined, TagsQuery.byName(name));
    }

    constructor(readonly type: BeanType<T> | undefined, readonly tags: ITagsQuery = TagsQuery.EMPTY) {
    }

    merge<O extends T>(other: IQuery<O>): IQuery<O> {
        // TODO Why do we create concrete class instead of using higher level system manager
        return new Query(other.type, this.tags.merge(other.tags));
    }

    mergeTagsOnly(tags: ITagsQuery): IQuery<T> {
        return tags.isEmpty ? this : new Query(this.type, this.tags.merge(tags));
    }

    concretiseType<O extends T>(type: BeanType<O>): IQuery<O> {
        return new Query(type, this.tags);
    }

    match(beanDefinitionMeta: IBeanDefinitionMeta<any>): boolean {
        return ((this.type === undefined) || TypeSupport.subTypeOf(beanDefinitionMeta.type, this.type))
            && this.tags.match(beanDefinitionMeta.tags);
    }

    stringify(): string {
        return `${this.type === undefined ? "no-type" : this.type.name}::[${this.tags.stringify()}]`;
    }




}

