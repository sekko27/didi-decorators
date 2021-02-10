import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";
import { TypeSupport } from "../../../../didi-commons/TypeSupport.ts";
import { MismatchedDeSerDefinitionTypeError } from "../../errors/MismatchedDeSerDefinitionTypeError.ts";

export class MapDeSerDefinition implements IDeSerDefinition {
    constructor( readonly keyDefinition: IDeSerDefinition, readonly valueDefinition: IDeSerDefinition) { }

    validateType(type: any): this {
        if (!TypeSupport.subTypeOf(type, Map)) {
            throw new MismatchedDeSerDefinitionTypeError(`${this.constructor.name} - expected map type - given ${type?.constructor?.name}`);
        }
        return this;
    }
}
