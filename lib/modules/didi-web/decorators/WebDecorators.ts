import { Metadata } from "../../didi-commons/lib/metadata/Metadata.ts";
import {
    IWebMetadata,
    IWebRequestParam,
    IWebRoute,
    TypedWebParamDeserializer,
    Verb,
    WebRequestParamType
} from "./interfaces/IWebMetadata.ts";
import { DecoratorSupport } from "../../didi-commons/lib/metadata/DecoratorSupport.ts";
import { BeanType } from "../../didi-commons/lib/types/BeanType.ts";

export class WebDecorators {
    // TODO Create commons helper to construct keys by conventions
    private static readonly METADATA_KEY: string = "metrix:decorators:web";
    private static readonly CONTROLLER_NAME_RE: RegExp = /Controller$/;
    private static readonly CONTROLLER_NAME_SUFFIX_LENGTH: number = "Controller".length;

    private static readonly SETTER: Metadata<IWebMetadata<any, any>> = new Metadata(
        WebDecorators.METADATA_KEY,
        (target: any) => {
            const name = WebDecorators.controllerName(target.name);
            return {
                name,
                routes: [],
                aggregateRoot: "",
                type: target,
                doc: `Web controller ${name}`
            };
        }
    );

    public static Controller(name?: string) {
        return (cls: any) => {
            WebDecorators.SETTER.setField(cls, "name", name ?? WebDecorators.controllerName(cls.name));
        }
    }

    public static Aggregate(root: string) {
        return (cls: any) => {
            WebDecorators.SETTER.setField(cls, "aggregateRoot", root);
        }
    }

    public static AggregateController(root: string, name?: string) {
        return (cls: any) => {
            WebDecorators.Controller(name)(cls);
            WebDecorators.Aggregate(root)(cls);
        }
    }

    public static ControllerDocumentation(doc: string) {
        return (cls: any) => {
            WebDecorators.SETTER.setField(cls, "doc", doc);
        }
    }

    public static Route(verb: Verb, path: string) {
        return (cls: any, method: string) => {
            const rmd = WebDecorators.routeMetadata(cls, method);
            rmd.verb = verb;
            rmd.path = path;
        }
    }

    public static Get(path: string) {
        return WebDecorators.VerbRoute(Verb.GET, path);
    }

    public static Post(path: string) {
        return WebDecorators.VerbRoute(Verb.POST, path);
    }

    public static Delete(path: string) {
        return WebDecorators.VerbRoute(Verb.DELETE, path);
    }

    public static Patch(path: string) {
        return WebDecorators.VerbRoute(Verb.PATCH, path);
    }

    public static Put(path: string) {
        return WebDecorators.VerbRoute(Verb.PUT, path);
    }

    public static Options(path: string) {
        return WebDecorators.VerbRoute(Verb.OPTIONS, path);
    }

    private static VerbRoute(verb: Verb, path: string) {
        return (cls: any, method: string) => {
            WebDecorators.Route(verb, path)(cls, method);
        }
    }

    private static routeMetadata(cls: any, action: string): IWebRoute<any> {
        const md = WebDecorators.SETTER.ownMetadata(cls.constructor);
        const route = md.routes.find(r => r.action === action);
        if (route === undefined) {
            const newRoute: IWebRoute<any> = {
                action,
                verb: Verb.GET,
                path: "",
                params: [],
                doc: `Controller action ${cls.constructor.name}::${action}`,
            }
            md.routes.push(newRoute);
            return newRoute;
        } else {
            return route;
        }
    }

    public static ActionDocumentation(doc: string) {
        return (cls: any, method: string) => {
            WebDecorators.routeMetadata(cls, method).doc = doc;
        }
    }

    public static PathParam(name?: string, deserializer?: TypedWebParamDeserializer<any, any>) {
        return (cls: any, method: string, index: number) => {
            WebDecorators.param(cls, method, index, WebRequestParamType.PATH, name, true, deserializer);
        }
    }


    private static param(
        cls: any,
        method: string,
        index: number,
        paramType: WebRequestParamType,
        customName?: string,
        required?: boolean,
        deserializer?: TypedWebParamDeserializer<any, any>
    ): IWebRequestParam<any, any> {
        const rmd = WebDecorators.routeMetadata(cls, method);
        const name = customName ?? DecoratorSupport.paramName(cls, method, index);
        const existing = rmd.params.find(p => p.name === name && paramType === paramType);
        if (existing === undefined) {
            const type = DecoratorSupport.paramType(cls, method, index);
            const param: IWebRequestParam<any, any> = {
                type,
                name,
                paramType,
                required: required === true,
                deserializer: WebDecorators.resolveDeserializer(type, deserializer),
                doc: `Parameter for ${cls.constructor.name}::${method}[${index}] :: ${name} of type "${type}"`,
            }
            rmd.params.push(param);
            return param;
        } else {
            return existing;
        }
    }

    private static resolveDeserializer(type: BeanType<any>, deserializer?: TypedWebParamDeserializer<any, any>): TypedWebParamDeserializer<any, any> {
        if (deserializer !== undefined) {
            return deserializer;
        }
        // TODO Implement
        return async () => undefined;
    }
    public static controllerName(base: string) {
        return WebDecorators.CONTROLLER_NAME_RE.test(base)
            ? base.substring(0, WebDecorators.CONTROLLER_NAME_SUFFIX_LENGTH)
            : base;
    }

}
