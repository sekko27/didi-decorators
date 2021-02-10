import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";

export class TransientDeSerDefinition implements IDeSerDefinition {
    validateType(type: any): this {
        return this;
    }

}
