import { IDeSerDefinition } from "./IDeSerDefinition.ts";

export class ArrayDeSerDefinition implements IDeSerDefinition {
    constructor(private readonly elementDefinition: IDeSerDefinition) {
    }
}
