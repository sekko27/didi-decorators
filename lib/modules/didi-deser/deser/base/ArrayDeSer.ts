import { IDeSer } from "../../definition/IDeSer.ts";
import { DeSerError } from "../../errors/DeSerError.ts";

export class ArrayDeSer implements IDeSer {
    constructor(private readonly elementDeSer: IDeSer) {
    }

    deserialize(source: any): any {
        if (!Array.isArray(source)) {
            throw new DeSerError(`Expecting array at deserialization: ${source}`);
        }
        return (source as any[]).map(e => this.elementDeSer.deserialize(e));
    }

    serialize(source: any): any {
        if (!Array.isArray(source)) {
            throw new DeSerError(`Expecting array at serialization: ${source}`);
        }
        return (source as any[]).map(e => this.elementDeSer.serialize(e))
    }


}
