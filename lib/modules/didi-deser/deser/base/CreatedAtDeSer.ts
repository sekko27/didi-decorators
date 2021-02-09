import { IDeSer } from "../../definition/IDeSer.ts";
import { PrimitiveDeSer } from "./PrimitiveDeSer.ts";

export class CreatedAtDeSer implements IDeSer {
    constructor(private readonly valueDeSer: PrimitiveDeSer) {
    }

    deserialize(source: any): any {
        return this.valueDeSer.deserialize(source);
    }

    serialize(source: any): any {
        return this.valueDeSer.serialize(source === undefined ? new Date() : source);
    }


}
