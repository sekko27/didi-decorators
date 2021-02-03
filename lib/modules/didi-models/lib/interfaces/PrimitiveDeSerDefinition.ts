import { IDeSerDefinition } from "./IDeSerDefinition.ts";
import { PrimitiveType } from "../../../didi-commons/TypeSupport.ts";

export class PrimitiveDeSerDefinition implements IDeSerDefinition {
    constructor(private readonly elementType: PrimitiveType) {
    }
}
