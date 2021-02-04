import { IDeSerDefinition } from "./IDeSerDefinition.ts";

export class ArrayDeSerDefinition implements IDeSerDefinition {
    constructor(
        readonly elementDefinition: IDeSerDefinition
    ) {
    }
}
