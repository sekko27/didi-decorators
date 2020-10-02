import { BeanType } from "../../modules/didi-commons/BeanType.ts";
import { Name } from "../../modules/didi-commons/Name.ts";
import { ITagsQuery } from "../../modules/didi-queries/interfaces/ITagsQuery.ts";

export interface IPropertyMetadata<T> {
    type: BeanType<T>;
    name: Name;
    tags: ITagsQuery;
    readonly?: boolean;
    enumerable?: boolean;
}
