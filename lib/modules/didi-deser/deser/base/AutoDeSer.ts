import { IDeSer } from "../../definition/IDeSer.ts";

export class AutoDeSer implements IDeSer {
    constructor(private readonly valueDeSer: IDeSer) {
    }

    deserialize(source: any): any {
        return this.valueDeSer.deserialize(source);
    }

    serialize(source: any): any {
        return this.valueDeSer.serialize(source);
    }


}
