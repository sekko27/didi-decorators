import { IDeSerDefinition } from "./IDeSerDefinition.ts";
import { IDeSerBuilder } from "../builder/IDeSerBuilder.ts";
import { IDeSer } from "./IDeSer.ts";

export class MixedDeSerDefinition implements IDeSerDefinition {
    build(specific: IDeSerBuilder): IDeSer {
        return specific.Mixed(this);
    }


}
