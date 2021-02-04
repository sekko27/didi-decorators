import { PrimitiveType } from "../../didi-commons/TypeSupport.ts";
import { IDeSerDefinition } from "./IDeSerDefinition.ts";

export class PrimitiveDeSerDefinition implements IDeSerDefinition {
    constructor(
        readonly type: PrimitiveType
    ) {
    }
}
