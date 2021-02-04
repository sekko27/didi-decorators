import { BeanType } from "../../didi-commons/BeanType.ts";
import { IDeSerDecoratorMetadata } from "../decorators/IDeSerDecoratorMetadata.ts";

export interface IDeSerBuilderContext {
    metadata(cls: BeanType<any>): IDeSerDecoratorMetadata[];
}
