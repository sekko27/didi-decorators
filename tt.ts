/*
import "./lib/modules/didi-commons/lib/vendor/Reflect.ts";
import * as acorn from "https://cdn.esm.sh/v43/acorn@8.4.1/deno/acorn.js";
const originalGet = Reflect.get;
const proxy = new Proxy(Reflect, {
    get(target: any, property: PropertyKey, receiver: any) {
        const original = originalGet(target, property, receiver);
        if (property === "metadata") {
            return function(key: string, value: string) {
                return function(t: any, p: string) {
                    if (key === "design:paramtypes") {
                        const func = `class X {${t[p].toString()}}`;
                        const params = acorn.parse(func, {ecmaVersion: 2017})
                            ?.body?.find?.((e: any) => e?.type === "ClassDeclaration" && e?.id?.name === "X")
                            ?.body?.body?.find?.((e: any) => e?.type === "MethodDefinition" && e?.key?.name === p && e?.kind === "method")
                            ?.value?.params?.map((e: any) => e?.name ?? e?.left?.name);
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

function D() {
    return function(target: any, method: string, index: number) {
        console.log(
            Reflect.getOwnMetadata("design:paramtypes", target, method),
            Reflect.getMetadata("design:paramnames", target, method),
        );
    };
}

*/
console.log(await Deno.emit("/foo.js", {
    sources: {
        "/foo.js": "class X {async m(a, b = () => \"lala (baba = '(kaka) {return `b`;}')\") {\n" +
"        return a.length;\n" +
"    }}"},

    }));
/*

class A {
    async m(@D() a: string, b: Function = () => "lala (baba = '(kaka) {return `b`;}')") {
        return a.length;
    }
}
*/
