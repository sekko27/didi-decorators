import { IDeSer } from "./IDeSer.ts";
import { IDeSerBuilder } from "../builder/IDeSerBuilder.ts";

export interface IDeSerDefinition {
    build(specific: IDeSerBuilder): IDeSer;
}
