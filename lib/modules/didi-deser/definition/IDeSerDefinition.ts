import { IDeSerBuilderContext } from "../builder/IDeSerBuilderContext.ts";
import { IDeSer } from "./IDeSer.ts";
import { IDeSerBuilder } from "../builder/IDeSerBuilder.ts";

export interface IDeSerDefinition {
    build(specific: IDeSerBuilder, context: IDeSerBuilderContext): IDeSer;
}
