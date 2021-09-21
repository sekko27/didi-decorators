export interface IRouterContext {
    readonly url: URL;
    readonly request: Request;
    readonly root: string;
    readonly path: string;
    readonly resolvedPathParams: Map<string, string>;

}
