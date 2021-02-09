import { IDeSerDefinition } from "./IDeSerDefinition.ts";
import { IDeSerBuilder } from "../builder/IDeSerBuilder.ts";
import { IDeSer } from "./IDeSer.ts";
import { PrimitiveDeSerDefinition } from "./PrimitiveDeSerDefinition.ts";

export class CreatedAtDeSerDefinition implements IDeSerDefinition {
    constructor(readonly valueDefinition: PrimitiveDeSerDefinition<Date>) { }
}
