import { BeanType } from "../../../../didi-commons/BeanType.ts";
import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";
import { IDeSerBuilder } from "../../interfaces/IDeSerBuilder.ts";
import { IDeSer } from "../../interfaces/IDeSer.ts";
import { TypeSupport } from "../../../../didi-commons/TypeSupport.ts";
import { MismatchedDeSerDefinitionTypeError } from "../../errors/MismatchedDeSerDefinitionTypeError.ts";
import { DeSerDecorators } from "../base/DeSerDecorators.ts";

export class EmbeddedDeSerDefinition implements IDeSerDefinition {
    constructor( readonly type: BeanType<any> ) { }

    validateType(type: any): this {
        if (!DeSerDecorators.isDecorated(this.type)) {
            throw new MismatchedDeSerDefinitionTypeError(`${this.constructor.name} - Only de-ser-decorated classes can be embedded: given ${this.type?.name ?? this.type}`);
        } else if (!TypeSupport.subTypeOf(type, this.type)) {
            throw new MismatchedDeSerDefinitionTypeError(`${this.constructor.name} - Expected type "${this?.type?.name}", given "${type?.name || type}`);
        }
        return this;
    }
}
