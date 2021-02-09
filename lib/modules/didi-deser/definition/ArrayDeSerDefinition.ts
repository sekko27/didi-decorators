import { IDeSerDefinition } from "./IDeSerDefinition.ts";
import { IDeSerBuilder } from "../builder/IDeSerBuilder.ts";
import { IDeSer } from "./IDeSer.ts";

export class ArrayDeSerDefinition implements IDeSerDefinition {
    constructor( readonly elementDefinition: IDeSerDefinition ) { }
}
