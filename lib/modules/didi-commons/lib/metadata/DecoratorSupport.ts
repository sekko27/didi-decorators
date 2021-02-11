import "../vendor/Reflect.ts";
import { Name } from "../types/Name.ts";

export class DecoratorSupport {
    public static fieldType(reflectTarget: any, field: Name): any {
        return Reflect.getMetadata("design:type", reflectTarget, field);
    }

    public static returnType(reflectTarget: any, method: string): any {
        return Reflect.getMetadata("design:returntype", reflectTarget, method);
    }

    public static paramTypes(reflectTarget: any, method: Name | undefined): any[] | undefined {
        return method === undefined
            ? Reflect.getMetadata("design:paramtypes", reflectTarget)
            : Reflect.getMetadata("design:paramtypes", reflectTarget, method);
    }

    public static paramType(reflectTarget: any, method: Name | undefined, index: number): any {
        const paramTypes = DecoratorSupport.paramTypes(reflectTarget, method) || [];
        if (index < 0 || index >= paramTypes.length) {
            throw new ReferenceError(`E_INDEX_OUT_OF_BOUND: ${reflectTarget.constructor ? reflectTarget.constructor.name : reflectTarget.name}.${String(method)} has no param at index ${index}`);
        }
        return paramTypes[index];
    }

    public static paramNames(reflectTarget: any, method: Name | undefined): string[] | undefined {
        return method === undefined
            ? Reflect.getMetadata("design:paramnames", reflectTarget)
            : Reflect.getMetadata("design:paramnames", reflectTarget, method);
    }

    public static paramName(reflectTarget: any, method: Name | undefined, index: number): string {
        const paramNames = DecoratorSupport.paramNames(reflectTarget, method) || [];
        if (index < 0 || index >= paramNames.length) {
            throw new ReferenceError(`E_INDEX_OUT_OF_BOUND: ${reflectTarget.constructor ? reflectTarget.constructor.name : reflectTarget.name}.${String(method)} has no param at index ${index}`);
        }
        return paramNames[index];
    }

    public static setterType(prototype: any, method: string): any {
        return DecoratorSupport.paramType(prototype, method, 0);
    }
}
