import { IDeSerDefinition } from "./IDeSerDefinition.ts";
import { IDeSerBuilder } from "../builder/IDeSerBuilder.ts";
import { IDeSerBuilderContext } from "../builder/IDeSerBuilderContext.ts";
import { IDeSer } from "./IDeSer.ts";

export class AutoDeSerDefinition implements IDeSerDefinition {
    constructor(readonly valueDefinition: IDeSerDefinition) {
    }

    build(specific: IDeSerBuilder, context: IDeSerBuilderContext): IDeSer {
        return specific.Auto(this, context);
    }


}