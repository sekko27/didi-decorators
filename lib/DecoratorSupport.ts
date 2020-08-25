import "./modules/didi-commons/vendor/Reflect.ts";

export class DecoratorSupport {
    public static fieldType(constructorOrPrototype: any, field: string): any {
        return Reflect.getMetadata("design:type", constructorOrPrototype, field);
    }

    public static returnType(constructorOrPrototype: any, method: string): any {
        return Reflect.getMetadata("design:returntype", constructorOrPrototype, method);
    }

    public static paramTypes(constructorOrPrototype: any, method: string): any[] {
        return Reflect.getMetadata("design:paramtypes", constructorOrPrototype, method);
    }

    public static paramType(constructorOrPrototype: any, method: string, index: number): any {
        const paramTypes = DecoratorSupport.paramTypes(constructorOrPrototype, method);
        if (index < 0 || index >= paramTypes.length) {
            throw new ReferenceError(`E_INDEX_OUT_OF_BOUND: ${constructorOrPrototype.constructor ? constructorOrPrototype.constructor.name : constructorOrPrototype.name}.${method} has no param at index ${index}`);
        }
        return paramTypes[index];
    }

    public static setterType(prototype: any, method: string): any {
        return DecoratorSupport.paramType(prototype, method, 0);
    }
}
