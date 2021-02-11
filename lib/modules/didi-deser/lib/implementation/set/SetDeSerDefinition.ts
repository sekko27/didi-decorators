import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";
import { TypeSupport } from "../../../../didi-commons/lib/utils/TypeSupport.ts";
import { MismatchedDeSerDefinitionTypeError } from "../../errors/MismatchedDeSerDefinitionTypeError.ts";

export class SetDeSerDefinition implements IDeSerDefinition {
    constructor(readonly valueDefinition: IDeSerDefinition) { }

    validateType(type: any): this {
        if (!TypeSupport.subTypeOf(type, Set)) {
            throw new MismatchedDeSerDefinitionTypeError(`${this.constructor.name} - expected set type - given ${type?.constructor?.name}`);
        }
        return this;
    }
}
