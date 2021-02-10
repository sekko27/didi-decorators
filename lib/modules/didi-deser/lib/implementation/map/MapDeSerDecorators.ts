import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";
import { DeSerDecorators } from "../base/DeSerDecorators.ts";
import { IDeSerDecoratorMetadataOptions } from "../../interfaces/IDeSerDecoratorMetadata.ts";
import { MapDeSerDefinition } from "./MapDeSerDefinition.ts";
import { DeSerValidation } from "../base/DeSerValidation.ts";

export function MapDef(keyDefinition: IDeSerDefinition, valueDefinition: IDeSerDefinition): MapDeSerDefinition {
    return new MapDeSerDefinition(keyDefinition, valueDefinition);
}

export function MapCollection(keyDefinition: IDeSerDefinition, valueDefinition: IDeSerDefinition, options: IDeSerDecoratorMetadataOptions = {}) {
    return DeSerDecorators.register(
        (cls, field) => DeSerValidation.validateFieldDefinition(cls, field, MapDef(keyDefinition, valueDefinition)),
        options
    );
}
