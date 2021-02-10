import { BeanType } from "../../../../didi-commons/BeanType.ts";
import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";
import { IDeSerBuilder } from "../../interfaces/IDeSerBuilder.ts";
import { IDeSer } from "../../interfaces/IDeSer.ts";
import { TypeSupport } from "../../../../didi-commons/TypeSupport.ts";
import { MismatchedDeSerDefinitionTypeError } from "../../errors/MismatchedDeSerDefinitionTypeError.ts";

export class EmbeddedDeSerDefinition implements IDeSerDefinition {
    constructor( readonly type: BeanType<any> ) { }

    validateType(type: any): this {
        if (!TypeSupport.subTypeOf(type, this.type)) {
            throw new MismatchedDeSerDefinitionTypeError(`${this.constructor.name} - Expected type "${this?.type?.name}", given "${type?.name || type}`);
        }
        return this;
    }


}
