import { IConditionalDeSerBuilder } from "../../interfaces/IConditionalDeSerBuilder.ts";
import { SetDeSerDefinition } from "./SetDeSerDefinition.ts";
import { IDeSerBuilderContext } from "../../interfaces/IDeSerBuilderContext.ts";
import { IDeSer } from "../../interfaces/IDeSer.ts";
import { SetDeSer } from "./SetDeSer.ts";
import { DefinitionBasedConditionalDeSerBuilder } from "../base/DefinitionBasedConditionalDeSerBuilder.ts";

export class SetDeSerBuilder extends DefinitionBasedConditionalDeSerBuilder<SetDeSerDefinition> implements IConditionalDeSerBuilder {
    constructor() {
        super(SetDeSerDefinition);
    }

    build(definition: SetDeSerDefinition, ctx: IDeSerBuilderContext): IDeSer {
        const deSer = ctx.manager.build(definition.valueDefinition, {
            manager: ctx.manager,
            path: ctx.path.concat("<elem>")
        });
        return new SetDeSer(deSer);
    }
}
