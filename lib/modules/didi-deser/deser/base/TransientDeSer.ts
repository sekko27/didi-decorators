import { IDeSer } from "../../definition/IDeSer.ts";

export class TransientDeSer implements IDeSer {
    constructor() {
    }

    deserialize(source: any): any {
        return undefined;
    }

    serialize(source: any): any {
        return undefined;
    }


}
