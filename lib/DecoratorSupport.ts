import {  } from "https://raw.githubusercontent.com/rbuckton/reflect-metadata/v0.1.12/Reflect.ts";

export class DecoratorSupport {
    public static fieldType(cls: any, field: string): any {
        return Reflect.getMetadata("design:type", cls, field);
    }

    public static returnType(cls: any, method: string): any {
        return Reflect.getMetadata("design:returntype", cls, method);
    }

    public static paramTypes(cls: any, method: string): any[] {
        return Reflect.getMetadata("design:paramtypes", cls, method);
    }

    public static paramType(cls: any, method: string, index: number): any {
        const paramTypes = DecoratorSupport.paramTypes(cls, method);
        if (index < 0 || index >= paramTypes.length) {
            throw new ReferenceError(`E_INDEX_OUT_OF_BOUND: ${cls.constructor ? cls.constructor.name : cls.name}.${method} has no param at index ${index}`);
        }
        return paramTypes[index];
    }

    public static setterType(cls: any, method: string): any {
        return DecoratorSupport.paramType(cls, method, 0);
    }
}
