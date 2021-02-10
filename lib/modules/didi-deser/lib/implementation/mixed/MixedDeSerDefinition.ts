import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";

export class MixedDeSerDefinition implements IDeSerDefinition {
    validateType(type: any): this {
        return this;
    }

}
