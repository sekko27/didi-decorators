import { IConditionalDeSerBuilder } from "./IConditionalDeSerBuilder.ts";
import { ArrayDeSerDefinition } from "../definition/ArrayDeSerDefinition.ts";
import { IDeSerBuilderContext } from "./IDeSerBuilderContext.ts";
import { IDeSer } from "../definition/IDeSer.ts";
import { ArrayDeSer } from "../deser/base/ArrayDeSer.ts";
import { IDeSerDefinition } from "../definition/IDeSerDefinition.ts";
import { AutoDeSerDefinition } from "../definition/AutoDeSerDefinition.ts";
import { AutoDeSer } from "../deser/base/AutoDeSer.ts";
import { DefinitionBasedConditionalDeSerBuilder } from "./DefinitionBasedConditionalDeSerBuilder.ts";
import { AutoIdDeSerDefinition } from "../definition/AutoIdDeSerDefinition.ts";
import { assert } from "../../../../deps.ts";
import { PrimitiveDeSerDefinition } from "../definition/PrimitiveDeSerDefinition.ts";
import { MongoAutoIdDeSer } from "../deser/mongo/MongoAutoIdDeSer.ts";

export class MongoAutoIdDeSerBuilder extends DefinitionBasedConditionalDeSerBuilder<AutoIdDeSerDefinition> implements IConditionalDeSerBuilder {
    constructor() {
        super(AutoIdDeSerDefinition);
    }

    build(definition: AutoIdDeSerDefinition, ctx: IDeSerBuilderContext): IDeSer {
        assert(definition.valueDefinition.constructor === PrimitiveDeSerDefinition);
        assert((definition.valueDefinition as PrimitiveDeSerDefinition).type === String);
        const valueDeSer = ctx.manager.build(definition.valueDefinition, {
            manager: ctx.manager,
            path: ctx.path.concat("<autoId>")
        });
        return new MongoAutoIdDeSer(valueDeSer);
    }
}
