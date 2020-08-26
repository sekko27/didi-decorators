import { BeanType } from "../modules/didi-commons/BeanType.ts";
import { ITagsPredicate } from "../modules/didi-tags/types/ITagsPredicate.ts";

export interface IPropertyMetadata<T> {
    type: BeanType<T>;
    name: string | symbol;
    tags: ITagsPredicate;
    readonly?: boolean;
    enumerable?: boolean;
}
