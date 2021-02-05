import { IDeSerDefinition } from "./IDeSerDefinition.ts";
import { IDeSerBuilder } from "../builder/IDeSerBuilder.ts";
import { IDeSer } from "./IDeSer.ts";

export class OptionalDeSerDefinition implements IDeSerDefinition {
    constructor(readonly valueDefinition: IDeSerDefinition) { }

    build(specific: IDeSerBuilder): IDeSer {
        return specific.Optional(this);
    }
}
