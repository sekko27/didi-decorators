import { IConditionalDeSerBuilder } from "../../interfaces/IConditionalDeSerBuilder.ts";
import { IDeSerBuilderContext } from "../../interfaces/IDeSerBuilderContext.ts";
import { IDeSer } from "../../interfaces/IDeSer.ts";
import { DefinitionBasedConditionalDeSerBuilder } from "../base/DefinitionBasedConditionalDeSerBuilder.ts";
import { CreatedAtDeSerDefinition } from "./CreatedAtDeSerDefinition.ts";
import { CreatedAtDeSer } from "./CreatedAtDeSer.ts";

// TODO Move to package contains decorator (make DeSer dec-helper public), deser-builder, deser
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
