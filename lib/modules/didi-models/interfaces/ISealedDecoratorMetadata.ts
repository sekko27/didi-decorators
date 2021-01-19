import { BeanType } from "../../didi-commons/BeanType.ts";

export interface ISealedDecoratorMetadata<T> {
    id: string;
    cls: BeanType<T>;
}
