import { IDeSerDefinition } from "./IDeSerDefinition.ts";

export interface IDeSerDecoratorMetadataOptions {
    alias?: string;
}

export interface IDeSerDecoratorMetadata {
    definition: IDeSerDefinition;
    name: string;
    options: IDeSerDecoratorMetadataOptions;
}
