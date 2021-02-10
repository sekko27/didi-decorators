import { IDeSer } from "../../interfaces/IDeSer.ts";

export class MixedDeSer implements IDeSer {
    deserialize(source: any): any {
        return source;
    }

    serialize(source: any): any {
        return source;
    }
}
