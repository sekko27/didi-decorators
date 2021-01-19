import { IDeSerDefinition } from "./IDeSerDefinition.ts";

export interface IModelFieldMetadata {
    name: string;
    alias?: string;
    transient?: boolean;
    definition?: IDeSerDefinition;
    required?: boolean;
}
