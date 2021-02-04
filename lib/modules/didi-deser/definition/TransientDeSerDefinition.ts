import { IDeSerDefinition } from "./IDeSerDefinition.ts";
import { IDeSerBuilder } from "../builder/IDeSerBuilder.ts";
import { IDeSerBuilderContext } from "../builder/IDeSerBuilderContext.ts";
import { IDeSer } from "./IDeSer.ts";

export class TransientDeSerDefinition implements IDeSerDefinition {
    build(specific: IDeSerBuilder, context: IDeSerBuilderContext): IDeSer {
        return specific.Transient(this, context);
    }


}
