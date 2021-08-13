import { DeSerDecorators } from "../base/DeSerDecorators.ts";
import { IDeSerDecoratorMetadataOptions } from "../../interfaces/IDeSerDecoratorMetadata.ts";
import { DecoratorSupport } from "../../../../didi-commons/lib/metadata/DecoratorSupport.ts";
import { BeanType } from "../../../../didi-commons/lib/types/BeanType.ts";
import { PrimitiveType } from "../../../../didi-commons/lib/utils/TypeSupport.ts";
import { PrimitiveDeSerDefinition } from "./PrimitiveDeSerDefinition.ts";
import { DeSerValidation } from "../base/DeSerValidation.ts";

export function PrimitiveDef(type: BeanType<PrimitiveType>): PrimitiveDeSerDefinition {
    return new PrimitiveDeSerDefinition(type);
}

export function Primitive( options: IDeSerDecoratorMetadataOptions = {}) {
    return DeSerDecorators.register(
        (prototype, field) => DeSerValidation.validateFieldDefinition(prototype, field, PrimitiveDef(DecoratorSupport.fieldType(prototype, field))),
        options
    );
}
