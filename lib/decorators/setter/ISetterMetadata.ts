import { BeanType } from "../../modules/didi-commons/BeanType.ts";
import { ITagsPredicate } from "../../modules/didi-tags/types/ITagsPredicate.ts";
import { IEntity } from "../../modules/didi-commons/IEntity.ts";

export interface ISetterMetadata<T> extends IEntity {
    type: BeanType<T>;
    id: string;
}
