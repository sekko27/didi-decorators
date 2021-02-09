import { IConditionalDeSerBuilder } from "./IConditionalDeSerBuilder.ts";
import { IDeSerBuilderContext } from "./IDeSerBuilderContext.ts";
import { IDeSer } from "../definition/IDeSer.ts";
import { DefinitionBasedConditionalDeSerBuilder } from "./DefinitionBasedConditionalDeSerBuilder.ts";
import { TransientDeSerDefinition } from "../definition/TransientDeSerDefinition.ts";
import { TransientDeSer } from "../deser/base/TransientDeSer.ts";

export class TransientDeSerBuilder extends DefinitionBasedConditionalDeSerBuilder<TransientDeSerDefinition> implements IConditionalDeSerBuilder{
    constructor() {
        super(TransientDeSerDefinition);
    }

    build(definition: TransientDeSerDefinition, ctx: IDeSerBuilderContext): IDeSer {
        return new TransientDeSer();
    }
}
