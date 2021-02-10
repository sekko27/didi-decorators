import { IConditionalDeSerBuilder } from "../../interfaces/IConditionalDeSerBuilder.ts";
import { IDeSerBuilderContext } from "../../interfaces/IDeSerBuilderContext.ts";
import { IDeSer } from "../../interfaces/IDeSer.ts";
import { DefinitionBasedConditionalDeSerBuilder } from "../base/DefinitionBasedConditionalDeSerBuilder.ts";
import { PrimitiveDeSer } from "../primitive/PrimitiveDeSer.ts";
import { PrimitiveDeSerDefinition } from "../primitive/PrimitiveDeSerDefinition.ts";
import { MixedDeSerDefinition } from "./MixedDeSerDefinition.ts";
import { MixedDeSer } from "./MixedDeSer.ts";

export class MixedDeSerBuilder extends DefinitionBasedConditionalDeSerBuilder<MixedDeSerDefinition> implements IConditionalDeSerBuilder {
    constructor() {
        super(MixedDeSerDefinition);
    }

    build(definition: MixedDeSerDefinition, ctx: IDeSerBuilderContext): IDeSer {
        return new MixedDeSer();
    }
}
