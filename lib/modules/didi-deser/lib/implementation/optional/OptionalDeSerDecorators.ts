import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";
import { DeSerDecorators } from "../base/DeSerDecorators.ts";
import { IDeSerDecoratorMetadataOptions } from "../../interfaces/IDeSerDecoratorMetadata.ts";
import { OptionalDeSerDefinition } from "./OptionalDeSerDefinition.ts";
import { DeSerValidation } from "../base/DeSerValidation.ts";
import { DeSerAutoDetection } from "../base/DeSerAutoDetection.ts";

export function Optional(valueDefinition?: IDeSerDefinition, options: IDeSerDecoratorMetadataOptions = {}) {
    return DeSerDecorators.register(
        (prototype, field) =>
            DeSerValidation.validateFieldDefinition(
                prototype,
                field,
                new OptionalDeSerDefinition(DeSerAutoDetection.detect(prototype, field, valueDefinition))
            ),
        options
    );
}
