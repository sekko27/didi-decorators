import { IConditionalDeSerBuilder } from "../lib/interfaces/IConditionalDeSerBuilder.ts";
import { IDeSerBuilderContext } from "../lib/interfaces/IDeSerBuilderContext.ts";
import { IDeSer } from "../lib/interfaces/IDeSer.ts";
import { DefinitionBasedConditionalDeSerBuilder } from "../lib/implementation/base/DefinitionBasedConditionalDeSerBuilder.ts";
import { AutoIdDeSerDefinition } from "../lib/implementation/autoId/AutoIdDeSerDefinition.ts";
import { assert } from "std/testing/asserts.ts";
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
