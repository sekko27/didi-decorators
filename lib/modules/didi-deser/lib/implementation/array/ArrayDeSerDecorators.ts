import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";
import { DeSerDecorators } from "../base/DeSerDecorators.ts";
import { IDeSerDecoratorMetadataOptions } from "../../interfaces/IDeSerDecoratorMetadata.ts";
import { ArrayDeSerDefinition } from "./ArrayDeSerDefinition.ts";
import { DeSerValidation } from "../base/DeSerValidation.ts";

export function ArrDef(elementDefinition: IDeSerDefinition): ArrayDeSerDefinition {
    return new ArrayDeSerDefinition(elementDefinition);
}

export function Arr(elementDefinition: IDeSerDefinition, options: IDeSerDecoratorMetadataOptions = {}) {
    return DeSerDecorators.register(
        (prototype, field) => DeSerValidation.validateFieldDefinition(prototype, field, ArrDef(elementDefinition)),
        options
    );
}
