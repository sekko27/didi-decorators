import { DeSerDecorators } from "../base/DeSerDecorators.ts";
import { IDeSerDecoratorMetadataOptions } from "../../interfaces/IDeSerDecoratorMetadata.ts";
import { CreatedAtDeSerDefinition } from "./CreatedAtDeSerDefinition.ts";
import { DeSerValidation } from "../base/DeSerValidation.ts";
import { PrimitiveDeSerDefinition } from "../primitive/PrimitiveDeSerDefinition.ts";

export function CreatedAt(options: IDeSerDecoratorMetadataOptions = {}) {
    return DeSerDecorators.register(
        (prototype, field) =>
            DeSerValidation.validateFieldDefinition(
                prototype,
                field,
                new CreatedAtDeSerDefinition(new PrimitiveDeSerDefinition(Date))
            ),
            options
    );
}
