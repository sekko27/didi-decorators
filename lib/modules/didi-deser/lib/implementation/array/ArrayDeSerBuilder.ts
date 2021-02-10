import { IConditionalDeSerBuilder } from "../../interfaces/IConditionalDeSerBuilder.ts";
import { ArrayDeSerDefinition } from "./ArrayDeSerDefinition.ts";
import { IDeSerBuilderContext } from "../../interfaces/IDeSerBuilderContext.ts";
import { IDeSer } from "../../interfaces/IDeSer.ts";
import { ArrayDeSer } from "./ArrayDeSer.ts";
import { DefinitionBasedConditionalDeSerBuilder } from "../base/DefinitionBasedConditionalDeSerBuilder.ts";

export class ArrayDeSerBuilder extends DefinitionBasedConditionalDeSerBuilder<ArrayDeSerDefinition> implements IConditionalDeSerBuilder {
    constructor() {
        super(ArrayDeSerDefinition);
    }

    build(definition: ArrayDeSerDefinition, ctx: IDeSerBuilderContext): IDeSer {
        const elementDeSer = ctx.manager.build(definition.elementDefinition, {
            manager: ctx.manager,
            path: ctx.path.concat("[]")
        });
        return new ArrayDeSer(elementDeSer);
    }
}
