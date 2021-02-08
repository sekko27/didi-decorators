import { IDeSer } from "../../definition/IDeSer.ts";

export class DefaultMixedDeSer implements IDeSer {
    deserialize(source: any): any {
        return source;
    }

    serialize(source: any): any {
        return source;
    }
}
