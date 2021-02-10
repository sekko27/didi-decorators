import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";
import { PrimitiveDeSerDefinition } from "../primitive/PrimitiveDeSerDefinition.ts";

export class CreatedAtDeSerDefinition implements IDeSerDefinition {
    constructor(readonly valueDefinition: PrimitiveDeSerDefinition<Date>) { }

    validateType(type: any): this {
        this.valueDefinition.validateType(type);
        return this;
    }
}
