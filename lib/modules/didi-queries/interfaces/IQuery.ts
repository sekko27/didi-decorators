import { BeanType } from "../../didi-commons/lib/types/BeanType.ts";
import { ITagsQuery } from "./ITagsQuery.ts";
import { IBeanDefinitionMeta } from "../../didi-container/bean/definition/IBeanDefinitionMeta.ts";
import { IStringifiable } from "../../didi-commons/lib/types/IStringifiable.ts";

export interface IQuery<T> extends IStringifiable {
    readonly type: BeanType<T> | undefined;
    readonly tags: ITagsQuery;
    merge<O extends T>(other: IQuery<O>): IQuery<O>;
    concretiseType<O extends T>(type: BeanType<O>): IQuery<O>;
    mergeTagsOnly(tags: ITagsQuery): IQuery<T>;
    match(beanDefinitionMeta: IBeanDefinitionMeta<any>): boolean;
}
