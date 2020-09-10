import { BeanType } from "../../modules/didi-commons/BeanType.ts";
import { ITagsPredicate } from "../../modules/didi-tags/types/ITagsPredicate.ts";
import { Name } from "../../modules/didi-commons/Name.ts";

export interface IPropertyMetadata<T> {
    type: BeanType<T>;
    name: Name;
    tags: ITagsPredicate;
    readonly?: boolean;
    enumerable?: boolean;
}
