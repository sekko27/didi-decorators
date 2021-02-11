import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";
import { DeSerDecorators } from "../base/DeSerDecorators.ts";
import { AutoDeSerDefinition } from "./AutoDeSerDefinition.ts";
import { IDeSerDecoratorMetadataOptions } from "../../interfaces/IDeSerDecoratorMetadata.ts";
import { DeSerAutoDetection } from "../base/DeSerAutoDetection.ts";
import { DeSerValidation } from "../base/DeSerValidation.ts";

export function Auto(valueDefinition?: IDeSerDefinition, options: IDeSerDecoratorMetadataOptions = {}) {
    return DeSerDecorators.register(
        (prototype, field) =>
            DeSerValidation.validateFieldDefinition(
                prototype,
                field,
                new AutoDeSerDefinition(
                    DeSerAutoDetection.detect(prototype, field, valueDefinition)
                )
            ),
            options
    );
}
