import { IConditionalDeSerBuilder } from "./IConditionalDeSerBuilder.ts";
import { ArrayDeSerDefinition } from "../definition/ArrayDeSerDefinition.ts";
import { IDeSerBuilderContext } from "./IDeSerBuilderContext.ts";
import { IDeSer } from "../definition/IDeSer.ts";
import { ArrayDeSer } from "../deser/base/ArrayDeSer.ts";
import { DefinitionBasedConditionalDeSerBuilder } from "./DefinitionBasedConditionalDeSerBuilder.ts";

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
