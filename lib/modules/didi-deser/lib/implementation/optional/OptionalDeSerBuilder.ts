import { IConditionalDeSerBuilder } from "../../interfaces/IConditionalDeSerBuilder.ts";
import { ArrayDeSerDefinition } from "../array/ArrayDeSerDefinition.ts";
import { IDeSerBuilderContext } from "../../interfaces/IDeSerBuilderContext.ts";
import { IDeSer } from "../../interfaces/IDeSer.ts";
import { ArrayDeSer } from "../array/ArrayDeSer.ts";
import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";
import { AutoDeSerDefinition } from "../auto/AutoDeSerDefinition.ts";
import { AutoDeSer } from "../auto/AutoDeSer.ts";
import { DefinitionBasedConditionalDeSerBuilder } from "../base/DefinitionBasedConditionalDeSerBuilder.ts";
import { OptionalDeSerDefinition } from "./OptionalDeSerDefinition.ts";
import { OptionalDeSer } from "./OptionalDeSer.ts";

export class OptionalDeSerBuilder  extends DefinitionBasedConditionalDeSerBuilder<OptionalDeSerDefinition> implements IConditionalDeSerBuilder{
    constructor() {
        super(OptionalDeSerDefinition);
    }

    build(definition: OptionalDeSerDefinition, ctx: IDeSerBuilderContext): IDeSer {
        const valueDeSer = ctx.manager.build(definition.valueDefinition, {
            manager: ctx.manager,
            path: ctx.path.concat("<auto>")
        });
        return new OptionalDeSer(valueDeSer);
    }
}
