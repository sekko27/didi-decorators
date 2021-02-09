import { IDeSer } from "../../definition/IDeSer.ts";
import { PrimitiveDeSer } from "../base/PrimitiveDeSer.ts";
import { assert, Bson } from "../../../../../deps.ts";

export class MongoAutoIdDeSer implements IDeSer {
    constructor(private readonly valueDeSer: PrimitiveDeSer) {
    }

    deserialize(source: any): any {
        assert(source instanceof Bson.ObjectId);
        return source.toString();
    }

    serialize(source: any): any {
        assert(typeof source === "string");
        return new Bson.ObjectId(source);
    }
}
