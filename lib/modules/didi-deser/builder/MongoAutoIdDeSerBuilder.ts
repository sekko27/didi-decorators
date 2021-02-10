import { IConditionalDeSerBuilder } from "../lib/interfaces/IConditionalDeSerBuilder.ts";
import { ArrayDeSerDefinition } from "../lib/implementation/array/ArrayDeSerDefinition.ts";
import { IDeSerBuilderContext } from "../lib/interfaces/IDeSerBuilderContext.ts";
import { IDeSer } from "../lib/interfaces/IDeSer.ts";
import { ArrayDeSer } from "../lib/implementation/array/ArrayDeSer.ts";
import { IDeSerDefinition } from "../lib/interfaces/IDeSerDefinition.ts";
import { AutoDeSerDefinition } from "../lib/implementation/auto/AutoDeSerDefinition.ts";
import { AutoDeSer } from "../lib/implementation/auto/AutoDeSer.ts";
import { DefinitionBasedConditionalDeSerBuilder } from "../lib/implementation/base/DefinitionBasedConditionalDeSerBuilder.ts";
import { AutoIdDeSerDefinition } from "../lib/implementation/autoId/AutoIdDeSerDefinition.ts";
import { assert } from "../../../../deps.ts";
import { PrimitiveDeSerDefinition } from "../lib/implementation/primitive/PrimitiveDeSerDefinition.ts";
import { MongoAutoIdDeSer } from "../deser/mongo/MongoAutoIdDeSer.ts";

export class MongoAutoIdDeSerBuilder extends DefinitionBasedConditionalDeSerBuilder<AutoIdDeSerDefinition> implements IConditionalDeSerBuilder {
    constructor() {
        super(AutoIdDeSerDefinition);
    }

    build(definition: AutoIdDeSerDefinition, ctx: IDeSerBuilderContext): IDeSer {
        assert(definition.valueDefinition.constructor === PrimitiveDeSerDefinition);
        assert((definition.valueDefinition as PrimitiveDeSerDefinition).type === String);
        return new MongoAutoIdDeSer();
    }
}
