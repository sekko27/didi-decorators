import { IDeSer } from "../../definition/IDeSer.ts";

export class DefaultOptionalDeSer implements IDeSer {
    constructor(private readonly valueDeSer: IDeSer) {
    }

    deserialize(source: any): any {
        return source === undefined ? undefined : this.valueDeSer.deserialize(source);
    }

    serialize(source: any): any {
        return source === undefined ? undefined : this.valueDeSer.serialize(source);
    }


}
