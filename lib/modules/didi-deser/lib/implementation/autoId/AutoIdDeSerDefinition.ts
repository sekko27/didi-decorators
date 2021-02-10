import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";

export class AutoIdDeSerDefinition implements IDeSerDefinition {
    constructor(readonly valueDefinition: IDeSerDefinition) { }

    validateType(type: any): this {
        // TODO Should validate here too, because auto-id can be string or integer
        this.valueDefinition.validateType(type);
        return this;
    }


}
