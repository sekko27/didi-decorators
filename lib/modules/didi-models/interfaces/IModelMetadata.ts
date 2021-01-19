import { IIndexDefinition } from "./IIndexDefinition.ts";
import { IModelFieldMetadata } from "./IModelFieldMetadata.ts";

export interface IModelMetadata<T> {
    alias: string;
    indices: IIndexDefinition[];
    fields: IModelFieldMetadata[];
}
