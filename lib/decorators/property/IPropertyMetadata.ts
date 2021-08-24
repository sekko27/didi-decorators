import { BeanType } from "../../modules/didi-commons/lib/types/BeanType.ts";
import { Name } from "../../modules/didi-commons/lib/types/Name.ts";
import { ITagsQuery } from "../../modules/didi-queries/interfaces/ITagsQuery.ts";

export interface IPropertyMetadata<T> {
    type: BeanType<T>;
    name: Name;
    tags: ITagsQuery;
    enableDefault?: boolean;
    readonly?: boolean;
    enumerable?: boolean;
}
