import { IDeSer } from "../../interfaces/IDeSer.ts";
import { DeSerError } from "../../errors/DeSerError.ts";
import { TypeSupport } from "../../../../didi-commons/lib/utils/TypeSupport.ts";
import { ArrayElementKeyValueProvider, DeSerArrayUtil, ElementBasedProvider } from "../base/DeSerArrayUtil.ts";

export class SetDeSer implements IDeSer {
    private static KeyProvider: ElementBasedProvider = (k: any) => k;
    private static ValueProvider: ElementBasedProvider = () => 0;

    constructor(private readonly valueDeSer: IDeSer) {
    }

    deserialize(source: any): any {
        if (!Array.isArray(source)) {
            throw new DeSerError(`Expecting array (because of map entries) at deserialization: ${source}`);
        }
        return new Set(source.map(e => this.valueDeSer.deserialize(e)));
    }

    serialize(source: any): any {
        if (!TypeSupport.subTypeOf(source?.constructor, Set)) {
            throw new DeSerError(`Expecting Set instance at serialization: ${source?.constructor?.name ?? source?.constructor ?? source}`);
        }
        const values = [];
        for (const value of (source as Set<any>).values()) {
            values.push(this.valueDeSer.serialize(value));
        }
        return DeSerArrayUtil.markAsUnordered(values, SetDeSer.KeyProvider, SetDeSer.ValueProvider);
    }

}
