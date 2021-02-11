import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";
import { DeSerDecorators } from "../base/DeSerDecorators.ts";
import { IDeSerDecoratorMetadataOptions } from "../../interfaces/IDeSerDecoratorMetadata.ts";
import { OptionalDeSerDefinition } from "../optional/OptionalDeSerDefinition.ts";
import { AutoIdDeSerDefinition } from "./AutoIdDeSerDefinition.ts";
import { DeSerAutoDetection } from "../base/DeSerAutoDetection.ts";
import { DeSerValidation } from "../base/DeSerValidation.ts";

export function AutoId(valueDefinition?: IDeSerDefinition, options: IDeSerDecoratorMetadataOptions = {}) {
    return DeSerDecorators.register(
        (prototype, field) =>
            DeSerValidation.validateFieldDefinition(
                prototype,
                field,
                new OptionalDeSerDefinition(
                    new AutoIdDeSerDefinition(
                        DeSerAutoDetection.detect(prototype, field, valueDefinition)
                    )
                )
            ),
        options
    );
}
