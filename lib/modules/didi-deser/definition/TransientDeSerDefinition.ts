import { IDeSerDefinition } from "./IDeSerDefinition.ts";
import { IDeSerBuilder } from "../builder/IDeSerBuilder.ts";
import { IDeSer } from "./IDeSer.ts";

export class TransientDeSerDefinition implements IDeSerDefinition {
    build(specific: IDeSerBuilder): IDeSer {
        return specific.Transient(this);
    }


}
