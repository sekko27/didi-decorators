import { BeanType } from "../../../didi-commons/lib/types/BeanType.ts";

export enum Verb {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    OPTIONS = "OPTIONS",
    PATCH = "PATCH",
}

export enum WebRequestParamType {
    PATH = "path",
    QUERY = "query",
    HEADER = "header",
    BODY = "body",
}

export type TypedWebParamDeserializer<T, C> = (ctx: C) => Promise<T>;
export type TypedWebResponseSerializer<T, C, R = any> = (ctx: C, source: T) => Promise<R>;

export interface IWebRequestParam<T, C> {
    name: string;
    paramType: WebRequestParamType;
    deserializer: TypedWebParamDeserializer<T, C>;
    type: BeanType<T>;
    doc?: string;
    required: boolean;
}
export interface IWebRequestPathParam<T, C> extends IWebRequestParam<T, C> {
    required: true;
    paramType: WebRequestParamType.PATH;
}

export interface IWebRequestQueryParam<T, C> extends IWebRequestParam<T, C> {
    paramType: WebRequestParamType.QUERY;
}

export interface IWebRequestHeaderParam<T, C> extends IWebRequestParam<T, C> {
    paramType: WebRequestParamType.HEADER;
}

export interface IWebRequestBodyParam<T, C> extends IWebRequestParam<T, C> {
    paramType: WebRequestParamType.BODY;
}

export enum ResponseCode {

}

export interface IWebResponse<C, T, R = any> {
    status: ResponseCode;
    type: BeanType<T>;
    serializer: TypedWebResponseSerializer<C, T, R>;
}
export interface IWebRoute<C> {
    path: string;
    verb: Verb;
    params: IWebRequestParam<any, C>[];
    action: string;
    doc: string;
}

export interface IWebMetadata<T, C> {
    name: string;
    type: BeanType<T>;
    aggregateRoot: string;
    routes: IWebRoute<C>[];
    doc?: string;
}
