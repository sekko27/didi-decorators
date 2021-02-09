import { IConditionalDeSerBuilder } from "./IConditionalDeSerBuilder.ts";
import { IDeSerBuilderContext } from "./IDeSerBuilderContext.ts";
import { IDeSer } from "../definition/IDeSer.ts";
import { DefinitionBasedConditionalDeSerBuilder } from "./DefinitionBasedConditionalDeSerBuilder.ts";
import { PrimitiveDeSer } from "../deser/base/PrimitiveDeSer.ts";
import { PrimitiveDeSerDefinition } from "../definition/PrimitiveDeSerDefinition.ts";
import { MixedDeSerDefinition } from "../definition/MixedDeSerDefinition.ts";
import { MixedDeSer } from "../deser/base/MixedDeSer.ts";

export class MixedDeSerBuilder extends DefinitionBasedConditionalDeSerBuilder<MixedDeSerDefinition> implements IConditionalDeSerBuilder {
    constructor() {
        super(MixedDeSerDefinition);
    }

    build(definition: MixedDeSerDefinition, ctx: IDeSerBuilderContext): IDeSer {
        return new MixedDeSer();
    }
}
