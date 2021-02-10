import { PrimitiveType, TypeSupport } from "../../../../didi-commons/TypeSupport.ts";
import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";
import { BeanType } from "../../../../didi-commons/BeanType.ts";
import { MismatchedDeSerDefinitionTypeError } from "../../errors/MismatchedDeSerDefinitionTypeError.ts";

export class PrimitiveDeSerDefinition<T extends PrimitiveType = PrimitiveType> implements IDeSerDefinition {
    constructor(readonly type: BeanType<T>) {}

    validateType(type: any): this {
        if (!TypeSupport.subTypeOf(type, this.type)) {
            throw new MismatchedDeSerDefinitionTypeError(`Expected ${this?.type?.name}, given ${type?.name ?? type}`);
        }
        return this;
    }


}
