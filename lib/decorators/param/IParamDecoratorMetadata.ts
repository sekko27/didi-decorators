import { BeanType } from "../../modules/didi-commons/BeanType.ts";
import { ITagsPredicate } from "../../modules/didi-tags/types/ITagsPredicate.ts";
import { Name } from "../../modules/didi-commons/Name.ts";

export interface IParamDecoratorMetadata<T> {
    target: any;
    type: BeanType<T>;
    methodName: Name | undefined;
    index: number;
    paramName?: string;
    query: ITagsPredicate;
}
