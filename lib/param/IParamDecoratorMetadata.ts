import { BeanType } from "../modules/didi-commons/BeanType.ts";
import { ITagsPredicate } from "../modules/didi-tags/types/ITagsPredicate.ts";

export interface IParamDecoratorMetadata<T> {
    target: any;
    type: BeanType<T>;
    methodName: string | symbol;
    index: number;
    paramName?: string;
    query: ITagsPredicate;
}
