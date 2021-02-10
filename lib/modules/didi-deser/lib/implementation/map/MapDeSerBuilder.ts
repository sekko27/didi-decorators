import { IConditionalDeSerBuilder } from "../../interfaces/IConditionalDeSerBuilder.ts";
import { MapDeSerDefinition } from "./MapDeSerDefinition.ts";
import { IDeSerBuilderContext } from "../../interfaces/IDeSerBuilderContext.ts";
import { IDeSer } from "../../interfaces/IDeSer.ts";
import { MapDeSer } from "./MapDeSer.ts";
import { DefinitionBasedConditionalDeSerBuilder } from "../base/DefinitionBasedConditionalDeSerBuilder.ts";

export class MapDeSerBuilder extends DefinitionBasedConditionalDeSerBuilder<MapDeSerDefinition> implements IConditionalDeSerBuilder {
    constructor() {
        super(MapDeSerDefinition);
    }

    build(definition: MapDeSerDefinition, ctx: IDeSerBuilderContext): IDeSer {
        // TODO Make util for path concat only in ctx
        const keyDeSer = ctx.manager.build(definition.keyDefinition, {
            manager: ctx.manager,
            path: ctx.path.concat("<key>")
        });
        const valueDeSer = ctx.manager.build(definition.valueDefinition, {
            manager: ctx.manager,
            path: ctx.path.concat("<value>")
        });
        return new MapDeSer(keyDeSer, valueDeSer);
    }
}
