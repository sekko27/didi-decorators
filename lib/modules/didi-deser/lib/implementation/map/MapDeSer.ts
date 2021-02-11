import { IDeSer } from "../../interfaces/IDeSer.ts";
import { DeSerError } from "../../errors/DeSerError.ts";
import { TypeSupport } from "../../../../didi-commons/lib/utils/TypeSupport.ts";
import { DeSerArrayUtil } from "../base/DeSerArrayUtil.ts";

export class MapDeSer implements IDeSer {
    constructor(private readonly keyDeSer: IDeSer, private readonly valueDeSer: IDeSer) {
    }

    deserialize(source: any): any {
        if (!Array.isArray(source)) {
            throw new DeSerError(`Expecting array (because of map entries) at deserialization: ${source}`);
        }
        return new Map((source as [any, any][]).map(([key, value]) => [this.keyDeSer.deserialize(key), this.valueDeSer.deserialize(value)]));
    }

    serialize(source: any): any {
        if (!TypeSupport.subTypeOf(source?.constructor, Map)) {
            throw new DeSerError(`Expecting Map instance at serialization: ${source?.constructor?.name ?? source?.constructor ?? source}`);
        }
        const entries = [];
        for (const [key, value] of (source as Map<any, any>).entries()) {
            entries.push([this.keyDeSer.serialize(key), this.valueDeSer.serialize(value)]);
        }
        return DeSerArrayUtil.markAsUnordered(entries);
    }

}
