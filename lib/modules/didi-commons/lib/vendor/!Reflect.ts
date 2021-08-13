import "./Reflect.ts";
import * as acorn from "https://cdn.esm.sh/v43/acorn@8.4.1/deno/acorn.js";
import cf from "https://dev.jspm.io/acorn-class-fields@0.3.7";

// @ts-ignore
const parser = cf(acorn.Parser);

const originalGet = Reflect.get;
const ECMA_VERSION=11;
function parseParams(target: any, property: string): string[] {
    if (property !== undefined) {
        const pd: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(target, property);
        if (pd?.set === undefined) {
            const method = pd?.value.toString();
            const source = `class X {${method}}`
            console.log(source)
            return parser.parse(source, {ecmaVersion: ECMA_VERSION})
                ?.body?.find?.((e: any) => e?.type === "ClassDeclaration" && e?.id?.name === "X")
                ?.body?.body?.find?.((e: any) => e?.type === "MethodDefinition" && e?.key?.name === property && e?.kind === "method")
                ?.value?.params?.map((e: any) => e?.name ?? e?.left?.name);
        } else {
            const method = pd?.set.toString();
            const source = `class X {${method}}`;
            console.log(source)
            return parser.parse(source, {ecmaVersion: ECMA_VERSION})
                ?.body?.find?.((e: any) => e?.type === "ClassDeclaration" && e?.id?.name === "X")
                ?.body?.body?.find?.((e: any) => e?.type === "MethodDefinition" && e?.key?.name === property && e?.kind === "set")
                ?.value?.params?.map((e: any) => e?.name ?? e?.left?.name);
        }
    } else {
        console.log(target.toString());
        return parser.parse(target.toString(), {ecmaVersion: ECMA_VERSION})
            ?.body?.find?.((e: any) => e?.type === "ClassDeclaration")
            ?.body?.body?.find?.((e: any) => e?.type === "MethodDefinition" && e?.kind === "constructor")
            ?.value?.params?.map((e: any) => e?.name ?? e?.left?.name);
    }
}


const proxy = new Proxy(Reflect, {
    get(target: any, property: PropertyKey, receiver: any) {
        const original = originalGet(target, property, receiver);
        if (property === "metadata") {
            return function(key: string, value: string) {
                return function(t: any, p: string) {
                    if (key === "design:paramtypes") {
                        const params = parseParams(t, p);
                        console.log(params);
                        original("design:paramnames", params)(t, p);
                    }
                    return original(key, value)(t, p);
                };
            };
        } else {
            return original;
        }
    }
});

// @ts-ignore
Reflect = proxy;
