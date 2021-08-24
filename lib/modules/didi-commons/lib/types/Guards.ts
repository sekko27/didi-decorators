import { assert, Bson } from "../../../../../deps.ts";

export class Guards {
    public static isString(value: any): value is string {
        return typeof value === "string";
    }

    public static isMongoId(value: any): value is typeof Bson.ObjectId {
        return typeof value === Bson.ObjectId;
    }

    public static ensureString(value: any, message: string = "String value expected"): string {
        assert(Guards.isString(value), message);
        return value;
    }

    public static ensureMongoId(value: any, message: string = "Expected mongo id (Bson.ObjectId)"): typeof Bson.ObjectId {
        assert(Guards.isMongoId(value), message);
        return value;
    }
}
