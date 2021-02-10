import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";
import { IDeSerBuilder } from "../../interfaces/IDeSerBuilder.ts";
import { IDeSer } from "../../interfaces/IDeSer.ts";

export class AutoDeSerDefinition implements IDeSerDefinition {
    constructor(readonly valueDefinition: IDeSerDefinition) { }

    validateType(type: any): this {
        this.valueDefinition.validateType(type);
        return this;
    }


}
