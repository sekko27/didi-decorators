import { IDeSerDefinition } from "../definition/IDeSerDefinition.ts";

export interface IDeSerDecoratorMetadataOptions {
    alias?: string;
}

export interface IDeSerDecoratorMetadata {
    definition: IDeSerDefinition;
    name: string;
    options: IDeSerDecoratorMetadataOptions;
}
