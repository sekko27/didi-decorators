import {  } from "https://raw.githubusercontent.com/rbuckton/reflect-metadata/v0.1.12/Reflect.ts";

export class ClassAnnotationSetter<T> {
    constructor(private readonly metadataKey: string, private readonly factory: (target: any) => T) {
    }

    public setField<F extends keyof T>(target: any, field: F, value: T[F]): void {
        this.getOrCreateInstance(target)[field] = value;
    }

    public getOrCreateInstance(target: any): T {
        if (!Reflect.hasMetadata(this.metadataKey, target)) {
            const instance: T = this.factory(target);
            Reflect.defineMetadata(this.metadataKey, instance, target);
            return instance;
        }
        return Reflect.getMetadata(this.metadataKey, target);
    }
}
