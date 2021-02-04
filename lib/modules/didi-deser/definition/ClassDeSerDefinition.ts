import { BeanType } from "../../didi-commons/BeanType.ts";
import { IDeSerDefinition } from "./IDeSerDefinition.ts";

export class ClassDeSerDefinition<T> implements IDeSerDefinition {
    constructor(
        readonly type: BeanType<T>
    ) {
    }
}
