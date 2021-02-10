import { IConditionalDeSerBuilder } from "../../interfaces/IConditionalDeSerBuilder.ts";
import { ArrayDeSerDefinition } from "../array/ArrayDeSerDefinition.ts";
import { IDeSerBuilderContext } from "../../interfaces/IDeSerBuilderContext.ts";
import { IDeSer } from "../../interfaces/IDeSer.ts";
import { ArrayDeSer } from "../array/ArrayDeSer.ts";
import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";
import { AutoDeSerDefinition } from "./AutoDeSerDefinition.ts";
import { AutoDeSer } from "./AutoDeSer.ts";
import { DefinitionBasedConditionalDeSerBuilder } from "../base/DefinitionBasedConditionalDeSerBuilder.ts";

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
