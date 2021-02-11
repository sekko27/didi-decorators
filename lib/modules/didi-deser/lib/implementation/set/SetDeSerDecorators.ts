import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";
import { DeSerDecorators } from "../base/DeSerDecorators.ts";
import { IDeSerDecoratorMetadataOptions } from "../../interfaces/IDeSerDecoratorMetadata.ts";
import { SetDeSerDefinition } from "./SetDeSerDefinition.ts";
import { DeSerValidation } from "../base/DeSerValidation.ts";

export function SetDef(valueDefinition: IDeSerDefinition): SetDeSerDefinition {
    return new SetDeSerDefinition(valueDefinition);
}

export function SetCollection(valueDefinition: IDeSerDefinition, options: IDeSerDecoratorMetadataOptions = {}) {
    return DeSerDecorators.register(
        (prototype, field) => DeSerValidation.validateFieldDefinition(prototype, field, SetDef(valueDefinition)),
        options
    );
}
