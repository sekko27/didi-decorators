import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";
import { TypeSupport } from "../../../../didi-commons/lib/utils/TypeSupport.ts";
import { MismatchedDeSerDefinitionTypeError } from "../../errors/MismatchedDeSerDefinitionTypeError.ts";

export class ArrayDeSerDefinition implements IDeSerDefinition {
    constructor( readonly elementDefinition: IDeSerDefinition ) { }

    validateType(type: any): this {
        if (!TypeSupport.isArrayType(type)) {
            throw new MismatchedDeSerDefinitionTypeError(`${this.constructor.name} - expected array type - given ${type?.constructor?.name}`);
        }
        return this;
    }
}
