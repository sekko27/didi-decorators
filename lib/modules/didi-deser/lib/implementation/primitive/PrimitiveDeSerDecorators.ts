import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";
import { DeSerDecorators } from "../base/DeSerDecorators.ts";
import { IDeSerDecoratorMetadataOptions } from "../../interfaces/IDeSerDecoratorMetadata.ts";
import { DecoratorSupport } from "../../../../didi-commons/metadata/DecoratorSupport.ts";
import { BeanType } from "../../../../didi-commons/BeanType.ts";
import { PrimitiveType } from "../../../../didi-commons/TypeSupport.ts";
import { PrimitiveDeSerDefinition } from "./PrimitiveDeSerDefinition.ts";

export function PrimitiveDef(type: BeanType<PrimitiveType>): PrimitiveDeSerDefinition {
    return new PrimitiveDeSerDefinition(type);
}

export function Primitive(valueDefinition?: IDeSerDefinition, options: IDeSerDecoratorMetadataOptions = {}) {
    return DeSerDecorators.register(
        (cls, field) => PrimitiveDef(DecoratorSupport.fieldType(cls, field)),
        options
    );
}
