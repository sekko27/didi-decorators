import { IConditionalDeSerBuilder } from "./IConditionalDeSerBuilder.ts";
import { ArrayDeSerDefinition } from "../definition/ArrayDeSerDefinition.ts";
import { IDeSerBuilderContext } from "./IDeSerBuilderContext.ts";
import { IDeSer } from "../definition/IDeSer.ts";
import { ArrayDeSer } from "../deser/base/ArrayDeSer.ts";
import { IDeSerDefinition } from "../definition/IDeSerDefinition.ts";
import { AutoDeSerDefinition } from "../definition/AutoDeSerDefinition.ts";
import { AutoDeSer } from "../deser/base/AutoDeSer.ts";
import { DefinitionBasedConditionalDeSerBuilder } from "./DefinitionBasedConditionalDeSerBuilder.ts";
import { CreatedAtDeSerDefinition } from "../definition/CreatedAtDeSerDefinition.ts";
import { PrimitiveDeSerDefinition } from "../definition/PrimitiveDeSerDefinition.ts";
import { CreatedAtDeSer } from "../deser/base/CreatedAtDeSer.ts";

export class CreatedAtDeSerBuilder extends DefinitionBasedConditionalDeSerBuilder<CreatedAtDeSerDefinition> implements IConditionalDeSerBuilder{
    constructor() {
        super(CreatedAtDeSerDefinition);
    }

    build(definition: CreatedAtDeSerDefinition, ctx: IDeSerBuilderContext): IDeSer {
        const valueDeSer = ctx.manager.build(definition.valueDefinition, {
            manager: ctx.manager,
            path: ctx.path.concat("<auto>")
        });
        return new CreatedAtDeSer(valueDeSer);
    }
}
