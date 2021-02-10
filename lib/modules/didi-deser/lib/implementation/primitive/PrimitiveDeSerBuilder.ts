import { IConditionalDeSerBuilder } from "../../interfaces/IConditionalDeSerBuilder.ts";
import { IDeSerBuilderContext } from "../../interfaces/IDeSerBuilderContext.ts";
import { IDeSer } from "../../interfaces/IDeSer.ts";
import { DefinitionBasedConditionalDeSerBuilder } from "../base/DefinitionBasedConditionalDeSerBuilder.ts";
import { PrimitiveDeSer } from "./PrimitiveDeSer.ts";
import { PrimitiveDeSerDefinition } from "./PrimitiveDeSerDefinition.ts";

export class PrimitiveDeSerBuilder extends DefinitionBasedConditionalDeSerBuilder<PrimitiveDeSerDefinition> implements IConditionalDeSerBuilder {
    constructor() {
        super(PrimitiveDeSerDefinition);
    }

    build(definition: PrimitiveDeSerDefinition, ctx: IDeSerBuilderContext): IDeSer {
        return new PrimitiveDeSer(definition.type, ctx.path);
    }
}
