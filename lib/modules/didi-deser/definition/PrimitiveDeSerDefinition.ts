import { PrimitiveType } from "../../didi-commons/TypeSupport.ts";
import { IDeSerDefinition } from "./IDeSerDefinition.ts";
import { BeanType } from "../../didi-commons/BeanType.ts";

export class PrimitiveDeSerDefinition<T extends PrimitiveType = PrimitiveType> implements IDeSerDefinition {
    constructor(readonly type: BeanType<T>) {
    }
}
