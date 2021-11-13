import type { Name } from "../types/Name.ts";

export type PrimitiveType = string | number | boolean | Date;

export class TypeSupport {
    public static isStringifiable(value: any): boolean {
        return typeof value?.stringify === "function";
    }

    public static subTypeOf(sub: any, sup: any) {
        return sub !== undefined && TypeSupport._subTypeOf(sub.prototype, sup.prototype);
    }

    public static getMethodNames(source: any): string[] {
        return Object
            .getOwnPropertyNames(source)
            .filter((m) => typeof source[m] === "function")
            .filter((m) => m !== "constructor");
    }

    public static getInstanceMethodNames(instance: any): Name[] {
        return TypeSupport.getMethodNames(Object.getPrototypeOf(instance));
    }

    public static hasParameterBasedOnStringRepresentation(func: Function) {
        const stringRepresentation = func.toString();
        if (/^class/.test(stringRepresentation)) {
            // Class constructor
            return /^class[^{]+{+\s*constructor\([^)]+\)/.test(stringRepresentation);
        } else if (/^function/.test(stringRepresentation)) {
            // Normal function
            return /^function[^(]+\([^)]+\)/.test(stringRepresentation);
        } else if (/^\(/.test(stringRepresentation)) {
            // Arrow function
            return /^\([^)]+\)/.test(stringRepresentation);
        } else {
            // TODO WTF is this
            return /^[^(]+\([^)]+\)/.test(stringRepresentation);
        }
    }

    public static hasParameter(func: Function) {
        return (func.length > 0) || TypeSupport.hasParameterBasedOnStringRepresentation(func);
    }

    public static isPrimitiveType(type: any): type is PrimitiveType {
        return TypeSupport.subTypeOf(type, String) ||
            TypeSupport.subTypeOf(type, Number) ||
            TypeSupport.subTypeOf(type, Boolean) ||
            TypeSupport.subTypeOf(type, Date);
    }

    public static isPrimitiveValue(value: any): boolean {
        const ctr = value?.constructor;
        return ctr === String || ctr === Number || ctr === Boolean || ctr === Date;
    }

    public static isArrayType(type: any): type is any[] {
        return TypeSupport.subTypeOf(type, Array);
    }

    public static isDefaultParam<T>(target: any, methodName: Name | undefined, index: number): boolean {
        if (methodName === undefined) {
            return index >= target.length;
        } else {
            const descriptor = Object.getOwnPropertyDescriptor(target, methodName);
            console.log(methodName, target, target?.[methodName])
            switch (true) {
                case descriptor === undefined: // Something fucked
                case descriptor?.get !== undefined: // Getter case
                case descriptor?.set !== undefined: // Setter case
                    return false;
                default:
                    return index >= target[methodName].length;
            }
        }
    }

    public static findSuperClass(cls: any, predicate: (cls: any) => boolean): any {
        for (let current = cls; current !== null; current = Object.getPrototypeOf(current)) {
            if (predicate(current)) {
                return current;
            }
        }
    }

    public static prototypeChainReducer<T>(proto: any, reducer: (memo: T, current: any) => T, initial: T): T {
        let result = initial;
        for (let current = proto; current !== null; current = Object.getPrototypeOf(current)) {
            result = reducer(result, current);
        }
        return result;
    }

    private static _subTypeOf(sub: any, sup: any): boolean {
        if (sub === null || sub === undefined) {
            return false;
        }
        const subProto = Object.getPrototypeOf(sub);
        return sub === sup || subProto === sup || TypeSupport._subTypeOf(subProto, sup);
    }



}
