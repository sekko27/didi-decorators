import { IConditionalDeSerBuilder } from "../../interfaces/IConditionalDeSerBuilder.ts";
import { IDeSerBuilderContext } from "../../interfaces/IDeSerBuilderContext.ts";
import { IDeSer } from "../../interfaces/IDeSer.ts";
import { DefinitionBasedConditionalDeSerBuilder } from "../base/DefinitionBasedConditionalDeSerBuilder.ts";
import { TransientDeSerDefinition } from "./TransientDeSerDefinition.ts";
import { TransientDeSer } from "./TransientDeSer.ts";

export class TransientDeSerBuilder extends DefinitionBasedConditionalDeSerBuilder<TransientDeSerDefinition> implements IConditionalDeSerBuilder{
    constructor() {
        super(TransientDeSerDefinition);
    }

    build(definition: TransientDeSerDefinition, ctx: IDeSerBuilderContext): IDeSer {
        return new TransientDeSer();
    }
}
