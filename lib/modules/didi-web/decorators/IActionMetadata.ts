import { ITypeDefinition } from "../types/ITypeDefinition.ts";
import { IActionParamMetadata } from "./IActionParamMetadata.ts";

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
