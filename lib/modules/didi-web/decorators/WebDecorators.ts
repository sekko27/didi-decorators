import { Metadata } from "../../didi-commons/lib/metadata/Metadata.ts";
import { IControllerMetadata } from "./IControllerMetadata.ts";
import { findPActionParamMetadataByIndex, IActionMetadata } from "./IActionMetadata.ts";
import type { Verb } from "./IActionMetadata.ts";

import { ISyncOptional, Optional } from "commons";
import {
    HeaderParamMetadata,
    IActionParamMetadata,
    PathParamMetadata,
    QueryParamMetadata
} from "./IActionParamMetadata.ts";
import type { ActionParamKind } from "./IActionParamMetadata.ts";
import { ITypeDefinition, TypeDefinitions } from "../types/ITypeDefinition.ts";
import { DecoratorSupport } from "../../didi-commons/lib/metadata/DecoratorSupport.ts";

export class WebDecorators {
    private static readonly CONTROLLER_NAME_REGEXP: RegExp = /^(.*)controller$/i;

    public static readonly METADATA_KEY: string = "metrix:decorators:web";
    private static readonly SETTER: Metadata<IControllerMetadata<any>>
        = new Metadata(
        WebDecorators.METADATA_KEY,
        (c) => ({
            name: c.name,
            actions: [],
            controller: c,
            path: ""
        }),
    );

    public static Controller(path?: string, name?: string) {
        return (cls: any) => {
            const cmd = WebDecorators.controllerMetadata(cls);
            cmd.name = name ?? WebDecorators.prepareControllerName(cls.name);
            cmd.path = path ?? "";
        }
    }

    public static ControllerDescription(description: string) {
        return (cls: any) => {
            WebDecorators.controllerMetadata(cls).description = description;
        }
    }

    public static Root(path: string) {
        return (cls: any) => {
            WebDecorators.SETTER.ownMetadata(cls).path = path;
        }
    }

    public static Action(path: string, verb?: Verb) {
        return (proto: any, method: string) => {
            const amd = WebDecorators.actionMetadataByName(proto.constructor, method);
            console.log(amd);
            amd.verb = verb ?? "get";
            amd.path = path;
        }
    }

    public static Get(path: string = "") {
        return WebDecorators.Action(path, "get");
    }

    public static Post(path: string = "") {
        return WebDecorators.Action(path, "post");
    }

    public static Put(path: string = "") {
        return WebDecorators.Action(path, "put");
    }

    public static Patch(path: string = "") {
        return WebDecorators.Action(path, "patch");
    }

    public static Delete(path: string = "") {
        return WebDecorators.Action(path, "delete");
    }

    public static Options(path: string = "") {
        return WebDecorators.Action(path, "options");
    }

    public static Path(type?: ITypeDefinition, name?: string) {
        return WebDecorators.Param("path", type, (param: PathParamMetadata<any>, proto, method, index) => {
            param.name = name ?? DecoratorSupport.paramName(proto, method, index);
        });
    }

    public static Query(type?: ITypeDefinition, name?: string) {
        return WebDecorators.Param("query", type, (param: QueryParamMetadata<any>, proto, method, index) => {
            param.name = name ?? DecoratorSupport.paramName(proto, method, index);
        });
    }

    public static Header(type?: ITypeDefinition, name?: string) {
        return WebDecorators.Param("header", type, (param: HeaderParamMetadata<any>, proto, method, index) => {
            param.name = name ?? DecoratorSupport.paramName(proto, method, index);
        });
    }

    public static Body(type?: ITypeDefinition) {
        return WebDecorators.Param("body", type);
    }

    public static Request(type?: ITypeDefinition) {
        return WebDecorators.Param("request", type);
    }

    public static Response(type?: ITypeDefinition) {
        return WebDecorators.Param("response", type);
    }

    public static ParamDescription(description: string) {
        return (proto: any, method: string, index: number) => {
            // TODO Add hint to move decorator down
            WebDecorators.optionalActionParamMetadata(proto.constructor, method, index)
                .orElseThrow(() => new TypeError(`No action parameter metadata has been found: ${proto.constructor.name}@${method}[${index}]`))
                .description = description;
        }
    }

    private static Param<T extends IActionParamMetadata<any>>(kind: ActionParamKind, type?: ITypeDefinition, configurator?: (param: T, proto: any, method: string, index: number) => void) {
        return (proto: any, method: string, index: number) => {
            const typeDef = type ?? WebDecorators.detectParamTypeDefinition(proto, method, index);
            const md = this.actionParamMetadata(proto.constructor, method, index, kind, typeDef);
            configurator?.(md as T, proto, method, index);
        }
    }

    public static controllerMetadata(constructor: any): IControllerMetadata<any> {
        return WebDecorators.SETTER.ownMetadata(constructor);
    }

    private static actionMetadataByName(constructor: any, method: string): IActionMetadata {
        const metadata = WebDecorators.controllerMetadata(constructor);
        const found = metadata.actions.find(amd => amd.name === method);
        return Optional.of<IActionMetadata>(found)
            .orElseGet(() => {
                const action: IActionMetadata = {
                    verb: "get",
                    path: "",
                    name: method,
                    params: [],
                    responses: []
                };
                metadata.actions.push(action);
                return action;
            });
    }

    private static optionalActionParamMetadata(constructor: any, method: string, index: number): ISyncOptional<IActionParamMetadata<unknown>> {
        return findPActionParamMetadataByIndex(WebDecorators.actionMetadataByName(constructor, method), index);
    }

    private static actionParamMetadata(
        constructor: any,
        method: string,
        index: number,
        kind: ActionParamKind,
        type: ITypeDefinition,
    ): IActionParamMetadata<unknown> {
        const amd = WebDecorators.actionMetadataByName(constructor, method);
        return findPActionParamMetadataByIndex(amd, index)
            .orElseGet(() => {
                const paramMetadata: IActionParamMetadata<any> = {index, kind, type};
                amd.params.push(paramMetadata);
                return paramMetadata;
            });
    }

    private static detectParamTypeDefinition(proto: any, method: string, index: number): ITypeDefinition {
        const type = DecoratorSupport.paramType(proto, method, index);
        return type === Object ? TypeDefinitions.Any : TypeDefinitions.InstanceOf(type);
    }

    public static prepareControllerName(name?: string): string {
        if (name === undefined) {
            throw new TypeError(`No controller name has been defined (show never be thrown)`);
        }
        const match = name.match(WebDecorators.CONTROLLER_NAME_REGEXP);
        return match === null ? name : match[1];
    }
}
