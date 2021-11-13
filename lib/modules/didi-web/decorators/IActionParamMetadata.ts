import type { ITypeDefinition } from "../types/ITypeDefinition.ts";

export type ActionParamKind =
    "path"
    | "query"
    | "header"
    | "body"
    | "request"
    | "response";

export interface IActionParamMetadata<T> {
    kind: ActionParamKind;
    index: number;
    type: ITypeDefinition;
    description?: string;
}

export interface PathParamMetadata<T> extends IActionParamMetadata<T> {
    kind: "path";
    name: string;
}

export function isPathParamMetadata(value: IActionParamMetadata<any>): value is PathParamMetadata<any> {
    return value.kind === "path";
}

export interface QueryParamMetadata<T> extends IActionParamMetadata<T> {
    kind: "query";
    name: string;
}

export function isQueryParamMetadata(value: IActionParamMetadata<any>): value is QueryParamMetadata<any> {
    return value.kind === "query";
}

export interface HeaderParamMetadata<T> extends IActionParamMetadata<T> {
    kind: "header";
    name: string;
}

export function isHeaderParamMetadata(value: IActionParamMetadata<any>): value is HeaderParamMetadata<any> {
    return value.kind === "header";
}

export interface BodyParamMetadata<T> extends IActionParamMetadata<T> {
    kind: "body";
}

export function isBodyParamMetadata(value: IActionParamMetadata<any>): value is BodyParamMetadata<any> {
    return value.kind === "body";
}

export interface RequestParamMetadata<T> extends IActionParamMetadata<T> {
    kind: "request";
}

export function isRequestParamMetadata(value: IActionParamMetadata<any>): value is RequestParamMetadata<any> {
    return value.kind === "request";
}

export interface ResponseParamMetadata<T> extends IActionParamMetadata<T> {
    kind: "response";
}

export function isResponseParamMetadata(value: IActionParamMetadata<any>): value is ResponseParamMetadata<any> {
    return value.kind === "response";
}

