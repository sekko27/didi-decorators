import { IDeSer } from "../../definition/IDeSer.ts";
import { PrimitiveType, TypeSupport } from "../../../didi-commons/TypeSupport.ts";
import { DeSerError } from "../../errors/DeSerError.ts";

export class DefaultPrimitiveDeSer implements IDeSer {
    constructor(type: PrimitiveType) {
    }

    deserialize(source: any): any {
        if (!TypeSupport.isPrimitiveType(source?.constructor)) {
            throw new DeSerError(`De-serializing undefined for primitive. If it's ok, then use Optional`);
        }
        return source;
    }

    serialize(source: any): any {
        if (!TypeSupport.isPrimitiveType(source?.constructor)) {
            throw new DeSerError(`Serializing undefined for primitive. If it's ok, then use Optional`);
        }
        return source;
    }


}
