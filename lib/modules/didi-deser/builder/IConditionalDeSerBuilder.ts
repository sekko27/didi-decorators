import { IDeSer } from "../definition/IDeSer.ts";
import { IDeSerBuilderContext } from "./IDeSerBuilderContext.ts";
import { IDeSerDefinition } from "../definition/IDeSerDefinition.ts";

export interface IConditionalDeSerBuilder {
    build(definition: IDeSerDefinition, ctx: IDeSerBuilderContext): IDeSer;
    test(definition: IDeSerDefinition): boolean;
}
