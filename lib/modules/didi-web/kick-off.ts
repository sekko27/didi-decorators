import { Name } from "../didi-commons/lib/types/Name.ts";
import { BeanType } from "../didi-commons/lib/types/BeanType.ts";

class ControllerHelper {
    private static readonly CONTROLLER_NAME_RE: RegExp = /Controller$/;
    private static readonly CONTROLLER_NAME_SUFFIX_LENGTH: number = "Controller".length;

    public static controllerName(base: string) {
        return ControllerHelper.CONTROLLER_NAME_RE.test(base)
            ? base.substring(0, ControllerHelper.CONTROLLER_NAME_SUFFIX_LENGTH)
            : base;
    }
}

enum Verb {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    OPTIONS = "OPTIONS"
}

interface IParam<T = any> {
    type: BeanType<T>;
    index: number;
    required?: boolean;
    defaultValue?: T;
}

interface IResponse<T = any> {
    type: BeanType<T>;
}

interface IRoute {
    verb: Verb;
    path: string;
    action: string;
    params: IParam[];
    responses: IResponse[];
}

interface IControllerMetadata {
    name: string;
    root?: string;
    routes: IRoute[];
}

function Controller(name?: string) {
    return (cls: any) => {
        const md: IControllerMetadata = {
            name: name ?? ControllerHelper.controllerName(cls.name),
            routes: []
        }

    }
}

function Root(root: string) {
    return (cls: any) => {

    }
}

function Route(path: string, verb: Verb = Verb.GET) {
    return (cls: any, method: Name) => {
        // TODO Check (path, verb) uniqueness
        // TODO Helper method for fetch by (path, verb)
    }
}

// TODO Create Route helpers (Get, Post, etc) by passing verb param

// TODO Param injection should be done by source-deserializer + transformation chain (including validation)
// TODO Validation is a no-op transformation
// TODO Should be different param implementation which provides source-deserializer. this deserializer needs the request scope (WebParamContext).
// TODO Model transformation (target is a model) should provide value objects only (anemic). joi to be used.

function QueryParam(name?: string) {
    return (cls: any, method: Name, index: number) => {

    }
}

function PathParam(name?: string) {
    return (cls: any, method: Name, index: number) => {

    }
}

enum ContentType {
}

function Response(type: BeanType<any>) {
    return (cls: any, method: Name) => {

    }
}

// TODO Params: query, path, header, body, stream
// TODO parameter transformations (using transformationContext includes request scope).
// TODO transformation vs mapping (naming convention)
// TODO Response transformations
// TODO Error handling (WebError)
// TODO Content negotiating: Consumes, Provides

@Controller("A")
@Root("/as")
class AController {
    @Route("/")
    getMethod(@QueryParam() limit: number) {

    }

    @Route("/{name}/{age}")
    @Response(Number)
    async getMethod2(@PathParam("name") n: string, @PathParam() age: number): Promise<number> {
        return 1;
    }
}
