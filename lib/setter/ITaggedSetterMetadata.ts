import { ISetterMetadata } from "./ISetterMetadata.ts";
import { ITagsPredicate } from "../modules/didi-tags/types/ITagsPredicate.ts";

export interface ITaggedSetterMetadata<T> extends ISetterMetadata<T> {
    tags: ITagsPredicate;
}
