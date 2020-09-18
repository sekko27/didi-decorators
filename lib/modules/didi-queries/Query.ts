import { IQuery } from "./interfaces/IQuery.ts";
import { BeanType } from "../didi-commons/BeanType.ts";
import { ITagsQuery } from "./interfaces/ITagsQuery.ts";
import { TagsQuery } from "./TagsQuery.ts";

export class Query<T> implements IQuery<T> {
    constructor(readonly type: BeanType<T>, readonly tags: ITagsQuery = TagsQuery.EMPTY) {
    }

    merge<O extends T>(other: IQuery<O>): IQuery<O> {
        // TODO Why do we create concrete class instead of using higher level system manager
        return new Query(other.type, this.tags.merge(other.tags));
    }

    mergeTagsOnly(tags: ITagsQuery): IQuery<T> {
        return tags.isEmpty ? this : new Query(this.type, this.tags.merge(tags));
    }

}

