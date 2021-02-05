import { IDeSerDefinition } from "./IDeSerDefinition.ts";
import { IDeSerBuilder } from "../builder/IDeSerBuilder.ts";
import { IDeSer } from "./IDeSer.ts";

export class AutoDeSerDefinition implements IDeSerDefinition {
    constructor(readonly valueDefinition: IDeSerDefinition) { }

    build(specific: IDeSerBuilder): IDeSer {
        return specific.Auto(this);
    }


}
