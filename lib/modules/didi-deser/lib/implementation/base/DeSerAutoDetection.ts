import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";
import { DecoratorSupport } from "../../../../../../mod.ts";
import { TypeSupport } from "../../../../didi-commons/lib/utils/TypeSupport.ts";
import { PrimitiveDef } from "../primitive/PrimitiveDeSerDecorators.ts";
import { DeSerDecorators } from "./DeSerDecorators.ts";
import { EmbeddedDef } from "../embedded/EmbeddedDeSerDecorators.ts";
import { UnableToDetectFieldDeSerDefinitionError } from "../../errors/UnableToDetectFieldDeSerDefinitionError.ts";

export class DeSerAutoDetection {
    public static detect(cls: any, field: string, definition?: IDeSerDefinition): IDeSerDefinition {
        if (definition !== undefined) {
            return definition;
        }
        const type = DecoratorSupport.fieldType(cls, field);
        if (TypeSupport.isPrimitiveType(type)) {
            return PrimitiveDef(type as any);
        } else if (TypeSupport.subTypeOf(type, Object) && DeSerDecorators.isDecorated(type)) {
            return EmbeddedDef(type);
        } else {
            throw new UnableToDetectFieldDeSerDefinitionError(cls, field);
        }
    }
}
