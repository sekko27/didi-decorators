import { ITypeDefinition } from "../types/ITypeDefinition.ts";
import { IActionParamMetadata } from "./IActionParamMetadata.ts";
import { ISyncOptional, Optional } from "commons";

export type Verb =
    "get"
    | "post"
    | "put"
    | "patch"
    | "delete"
    | "options";

export interface IActionResponseMetadata {
    description: string;
    code: number;
    type: ITypeDefinition;
}

export interface IActionMetadata {
    verb: Verb;
    path: string;
    name: string;
    description?: string;
    params: IActionParamMetadata<any>[];
    responses: IActionResponseMetadata[];
}

export function findPActionParamMetadataByIndex(amd: IActionMetadata, index: number): ISyncOptional<IActionParamMetadata<unknown>> {
    return Optional.of(amd.params.find(p => p.index === index));
}
