import * as acorn from "https://cdn.esm.sh/v43/acorn@8.4.1/deno/acorn.js";
import cf from "https://dev.jspm.io/acorn-class-fields@0.3.7";

type AcornParser = {
    parse(source: any, options: any): any;
}

export class ParamNameHelper {
    private static readonly CLASS_NAME: string = "X";
    private static readonly ECMA_VERSION: number = 11;
    private static readonly CACHE: Map<Function, string[]> = new Map();

    // @ts-ignore
    private static readonly PARSER: AcornParser = cf(acorn.Parser);

    public static parseParams(constructor: any, property: string | undefined = undefined): string[] {
        const target = property === undefined ? constructor : constructor.prototype;
        const cacheKey: Function = property === undefined ? constructor : target[property];
        const result = ParamNameHelper.CACHE.get(cacheKey);
        if (result === undefined) {
            console.log("resolve");
            const params = property === undefined
                ? ParamNameHelper.parseConstructorParam(constructor)
                : ParamNameHelper.parseMethodParams(constructor.prototype, property);
            ParamNameHelper.CACHE.set(cacheKey, params);
            return params;
        } else {
            return result;
        }
    }

    private static parseMethodParams(target: any, property: string): string[] {
        // TODO Use optional
        const pd: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(target, property);
        if (pd === undefined) {
            throw new TypeError(`No property descriptor has been found for ${target}.${property}`);
        }
        return pd.set === undefined
            ? ParamNameHelper.parseNonSetterMethodParams(property, pd)
            : ParamNameHelper.parseSetterParams(property, pd.set);
    }

    private static parseConstructorParam(cls: any): string[] {
        return ParamNameHelper.extractParams(ParamNameHelper.findMethod(cls.toString(), "constructor"));
    }

    private static parseNonSetterMethodParams(property: string, pd?: PropertyDescriptor): string[] {
        return ParamNameHelper.extractParams(
            ParamNameHelper.findMethod(
                `class ${ParamNameHelper.CLASS_NAME} {${pd?.value.toString()}}`,
                "method",
                ParamNameHelper.classNameFilter,
                (e) => e?.key?.name === property
            ),
        );
    }

    private static parseSetterParams(property: string, setter: (value: any) => void): string[] {
        return ParamNameHelper.extractParams(
            ParamNameHelper.findMethod(
                `class ${ParamNameHelper.CLASS_NAME} {${setter.toString()}}`,
                "set",
                ParamNameHelper.classNameFilter,
                (e) => e?.key?.name === property
            ),
        );
    }

    private static parse(source: string): any {
        return ParamNameHelper.PARSER.parse(source, {ecmaVersion: ParamNameHelper.ECMA_VERSION});
    }

    private static findMethod(
        source: string,
        kind: string,
        classFilter: (m: any) => boolean = () => true,
        methodFilter: (e: any) => boolean = () => true,
    ): any {
        return ParamNameHelper.parse(source)
            ?.body?.find?.((e: any) => e?.type === "ClassDeclaration" && classFilter(e))
            ?.body?.body?.find?.((e: any) => e?.type === "MethodDefinition" && (e?.kind === kind) && methodFilter(e));
    }

    private static classNameFilter(c: any): boolean {
        return c?.id?.name === ParamNameHelper.CLASS_NAME;
    }

    private static extractParams(methodDescriptor: any): string[] {
        return methodDescriptor?.value?.params?.map((e: any) => {
            if (e?.type === "Identifier") {
                return e.name;
            } else if (e?.type === "RestElement") {
                return e.argument.name;
            } else if (e?.type === "AssignmentPattern") {
                return e.left.name;
            } else {
                throw new TypeError(`Unhandled parameter type: ${JSON.stringify(e, null, 2)}`);
            }
        }) ?? [];
    }
}

class EmptyConstructorParam {}

class EmptyConstructorParam2 {
    constructor() {
    }
}

class ConstructorParam {
    constructor(param1: string, param2: number) {
    }
}

class ConstructorOptionalParam {
    constructor(param1: string, param2?: number) {
    }
}

class ConstructorDefaultParam {
    constructor(param1: string, param2: number = 3) {
    }
}

class ConstructorVariadicParam {
    constructor(param1: string, ...additional: number[]) {
    }
}

console.log(ParamNameHelper.parseParams(EmptyConstructorParam));
console.log(ParamNameHelper.parseParams(EmptyConstructorParam2));
console.log(ParamNameHelper.parseParams(ConstructorParam));
console.log(ParamNameHelper.parseParams(ConstructorOptionalParam));
console.log(ParamNameHelper.parseParams(ConstructorDefaultParam));
console.log(ParamNameHelper.parseParams(ConstructorVariadicParam));

class NonSetter1 {method() {}}
class NonSetter2 {
    static readonly DEF_1: number = 1;
    static readonly DEF_2: () => number = () => 1;
    method(p: string, q: number) {
        return 1;
    }

    async method_a_1(p: string, q?: number) {}

    method2(p: string, q?: number) {}
    method3(p: string, q: number = 3) {}
    method4(p: string, ...q: number[]) {}
    method5(p: string, q: number = NonSetter2.DEF_1) {}
    method6(p: string, q: number = NonSetter2.DEF_2()) {}

    set set1(p: number) {}
}
console.log(ParamNameHelper.parseParams(NonSetter1, "method"));
console.log(ParamNameHelper.parseParams(NonSetter2, "method"));
console.log(ParamNameHelper.parseParams(NonSetter2, "method2"));
console.log(ParamNameHelper.parseParams(NonSetter2, "method3"));
console.log(ParamNameHelper.parseParams(NonSetter2, "method4"));
console.log(ParamNameHelper.parseParams(NonSetter2, "method5"));
console.log(ParamNameHelper.parseParams(NonSetter2, "method6"));
console.log(ParamNameHelper.parseParams(NonSetter2, "method_a_1"));
console.log(ParamNameHelper.parseParams(NonSetter2, "set1"));
console.log(ParamNameHelper.parseParams(NonSetter2, "set1"));
