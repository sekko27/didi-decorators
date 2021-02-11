import { IDeSer } from "../../interfaces/IDeSer.ts";
import { PrimitiveType, TypeSupport } from "../../../../didi-commons/lib/utils/TypeSupport.ts";
import { DeSerError } from "../../errors/DeSerError.ts";
import { BeanType } from "../../../../didi-commons/lib/types/BeanType.ts";

export class PrimitiveDeSer implements IDeSer {
    // TODO Pass path for all de-ser impls
    constructor(type: BeanType<PrimitiveType>, private readonly path: readonly string[]) {
    }

    deserialize(source: any): any {
        if (!TypeSupport.isPrimitiveType(source?.constructor)) {
            throw new DeSerError(`De-serializing undefined for primitive on path "${this.path.join(".")}". If it's ok, then use Optional`);
        }
        return source;
    }

    serialize(source: any): any {
        if (!TypeSupport.isPrimitiveType(source?.constructor)) {
            throw new DeSerError(`Serializing undefined for primitive on path "${this.path.join(".")}". If it's ok, then use Optional`);
        }
        return source;
    }


}
