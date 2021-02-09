import { IConditionalDeSerBuilder } from "./IConditionalDeSerBuilder.ts";
import { IDeSerBuilderContext } from "./IDeSerBuilderContext.ts";
import { IDeSer } from "../definition/IDeSer.ts";
import { DefinitionBasedConditionalDeSerBuilder } from "./DefinitionBasedConditionalDeSerBuilder.ts";
import { PrimitiveDeSer } from "../deser/base/PrimitiveDeSer.ts";
import { PrimitiveDeSerDefinition } from "../definition/PrimitiveDeSerDefinition.ts";

export class PrimitiveDeSerBuilder extends DefinitionBasedConditionalDeSerBuilder<PrimitiveDeSerDefinition> implements IConditionalDeSerBuilder {
    constructor() {
        super(PrimitiveDeSerDefinition);
    }

    build(definition: PrimitiveDeSerDefinition, ctx: IDeSerBuilderContext): IDeSer {
        return new PrimitiveDeSer(definition.type);
    }
}
