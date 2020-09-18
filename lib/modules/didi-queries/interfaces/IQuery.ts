import { BeanType } from "../../didi-commons/BeanType.ts";
import { ITagsQuery } from "./ITagsQuery.ts";

export interface IQuery<T> {
    readonly type: BeanType<T>;
    readonly tags: ITagsQuery;
    merge<O extends T>(other: IQuery<O>): IQuery<O>;
    mergeTagsOnly(tags: ITagsQuery): IQuery<T>;
}
