import { IDeSer } from "./IDeSer.ts";
import { IDeSerBuilderContext } from "./IDeSerBuilderContext.ts";
import { IDeSerDefinition } from "./IDeSerDefinition.ts";

export interface IConditionalDeSerBuilder {
    build(definition: IDeSerDefinition, ctx: IDeSerBuilderContext): IDeSer;
    test(definition: IDeSerDefinition): boolean;
}
