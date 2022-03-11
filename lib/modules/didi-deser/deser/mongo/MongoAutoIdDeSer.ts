import { IDeSer } from "../../lib/interfaces/IDeSer.ts";
import { Bson } from "mongo/mod.ts";
import { Guards } from "../../../didi-commons/lib/types/Guards.ts";

export class MongoAutoIdDeSer implements IDeSer {
    deserialize(source: any): any {
        return (Guards.ensureMongoId(source)).toString();
    }

    serialize(source: any): any {
        return new Bson.ObjectId(
            Guards.ensureString(source, `Serializing mongo id expects string source: ${source}`)
        );
    }
}
