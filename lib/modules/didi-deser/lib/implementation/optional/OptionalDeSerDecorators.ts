import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";
import { DeSerDecorators } from "../base/DeSerDecorators.ts";
import { IDeSerDecoratorMetadataOptions } from "../../interfaces/IDeSerDecoratorMetadata.ts";
import { OptionalDeSerDefinition } from "./OptionalDeSerDefinition.ts";
import { DeSerValidation } from "../base/DeSerValidation.ts";
import { DeSerAutoDetection } from "../base/DeSerAutoDetection.ts";

export function Optional(valueDefinition?: IDeSerDefinition, options: IDeSerDecoratorMetadataOptions = {}) {
    return DeSerDecorators.register(
        (cls, field) =>
            DeSerValidation.validateFieldDefinition(
                cls,
                field,
                new OptionalDeSerDefinition(DeSerAutoDetection.detect(cls, field, valueDefinition))
            ),
        options
    );
}
