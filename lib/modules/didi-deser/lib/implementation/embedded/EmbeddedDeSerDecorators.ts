import { DeSerDecorators } from "../base/DeSerDecorators.ts";
import { IDeSerDecoratorMetadataOptions } from "../../interfaces/IDeSerDecoratorMetadata.ts";
import { EmbeddedDeSerDefinition } from "./EmbeddedDeSerDefinition.ts";
import { DecoratorSupport } from "../../../../didi-commons/lib/metadata/DecoratorSupport.ts";
import { BeanType } from "../../../../didi-commons/lib/types/BeanType.ts";
import { DeSerValidation } from "../base/DeSerValidation.ts";

export function EmbeddedDef(type: BeanType<any>): EmbeddedDeSerDefinition {
    return new EmbeddedDeSerDefinition(type);
}

export function Embedded(options: IDeSerDecoratorMetadataOptions = {}) {
    return DeSerDecorators.register(
        (prototype, field) =>
            DeSerValidation.validateFieldDefinition(
                prototype,
                field,
                EmbeddedDef(DecoratorSupport.fieldType(prototype, field))
        ),
        options
    );
}
