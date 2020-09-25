import { BeanType } from "../../didi-commons/BeanType.ts";
import { ITagsQuery } from "./ITagsQuery.ts";

export interface IQuery<T> {
    readonly type: BeanType<T> | undefined;
    readonly tags: ITagsQuery;
    merge<O extends T>(other: IQuery<O>): IQuery<O>;
    concretiseType<O extends T>(type: BeanType<O>): IQuery<O>;
    mergeTagsOnly(tags: ITagsQuery): IQuery<T>;
}
