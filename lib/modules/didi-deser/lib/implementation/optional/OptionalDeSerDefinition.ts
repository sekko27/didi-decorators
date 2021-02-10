import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";

export class OptionalDeSerDefinition implements IDeSerDefinition {
    constructor(readonly valueDefinition: IDeSerDefinition) { }

    validateType(type: any): this {
        this.valueDefinition.validateType(type);
        return this;
    }


}
