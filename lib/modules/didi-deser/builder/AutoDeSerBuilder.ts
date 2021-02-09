import { IConditionalDeSerBuilder } from "./IConditionalDeSerBuilder.ts";
import { ArrayDeSerDefinition } from "../definition/ArrayDeSerDefinition.ts";
import { IDeSerBuilderContext } from "./IDeSerBuilderContext.ts";
import { IDeSer } from "../definition/IDeSer.ts";
import { ArrayDeSer } from "../deser/base/ArrayDeSer.ts";
import { IDeSerDefinition } from "../definition/IDeSerDefinition.ts";
import { AutoDeSerDefinition } from "../definition/AutoDeSerDefinition.ts";
import { AutoDeSer } from "../deser/base/AutoDeSer.ts";
import { DefinitionBasedConditionalDeSerBuilder } from "./DefinitionBasedConditionalDeSerBuilder.ts";

export class AutoDeSerBuilder  extends DefinitionBasedConditionalDeSerBuilder<AutoDeSerDefinition> implements IConditionalDeSerBuilder{
    constructor() {
        super(AutoDeSerDefinition);
    }

    build(definition: AutoDeSerDefinition, ctx: IDeSerBuilderContext): IDeSer {
        const valueDeSer = ctx.manager.build(definition.valueDefinition, {
            manager: ctx.manager,
            path: ctx.path.concat("<auto>")
        });
        return new AutoDeSer(valueDeSer);
    }
}
