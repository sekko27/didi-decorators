import { IDeSer } from "../../interfaces/IDeSer.ts";

export class CreatedAtDeSer implements IDeSer {
    constructor() {
    }

    deserialize(source: any): any {
        return source;
    }

    serialize(source: any): any {
        return source ?? new Date();
    }


}
