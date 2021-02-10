import { IDeSer } from "../../lib/interfaces/IDeSer.ts";
import { PrimitiveDeSer } from "../../lib/implementation/primitive/PrimitiveDeSer.ts";
import { assert, Bson } from "../../../../../deps.ts";

export class MongoAutoIdDeSer implements IDeSer {
    deserialize(source: any): any {
        assert(source instanceof Bson.ObjectId);
        return source.toString();
    }

    serialize(source: any): any {
        assert(typeof source === "string");
        return new Bson.ObjectId(source);
    }
}
