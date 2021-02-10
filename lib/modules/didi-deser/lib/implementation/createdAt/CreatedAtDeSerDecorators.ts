import { DeSerDecorators } from "../base/DeSerDecorators.ts";
import { IDeSerDecoratorMetadataOptions } from "../../interfaces/IDeSerDecoratorMetadata.ts";
import { CreatedAtDeSerDefinition } from "./CreatedAtDeSerDefinition.ts";
import { DeSerValidation } from "../base/DeSerValidation.ts";
import { PrimitiveDeSerDefinition } from "../primitive/PrimitiveDeSerDefinition.ts";

export function CreatedAt(options: IDeSerDecoratorMetadataOptions = {}) {
    return DeSerDecorators.register(
        (cls, field) =>
            DeSerValidation.validateFieldDefinition(
                cls,
                field,
                new CreatedAtDeSerDefinition(new PrimitiveDeSerDefinition(Date))
            ),
            options
    );
}
