import "../vendor/Reflect.ts";
import { MetadataSetter } from "./MetadataSetter.ts";
import { TypeSupport } from "../TypeSupport.ts";
import { IInitDestroyMethodMetadata } from "../../../decorators/init-destroy-method/IInitDestroyMethodMetadata.ts";

import { PositionSupport } from "../../../../deps.ts";
/**
 * Per target (prototype / constructor) metadata setter when the metadata can be specified by type.
 */
export class ClassMetadataSetter<C> {

    constructor(private readonly metadataKey: string, private readonly metadataInstanceFactory: (target: any) => C) {
    }

    public setField<F extends keyof C>(target: any, field: F, value: C[F]): this {
        this.ownMetadata(target)[field] = value;
        return this;
    }

    public metadata(prototype: any, reducer: (memo: C, current: C) => C, initial: C): C {
        if (!this.isDecorated(prototype)) {
            const metadata: C = this.metadataInstanceFactory(prototype);
            Reflect.defineMetadata(this.metadataKey, metadata, prototype);
            return metadata;
        }
        // TODO Check
        let result: C = initial;
        let current = prototype;
        while (current !== null) {
            if (this.isOwnDecorated(current)) {
                result = reducer(result, this.ownMetadata(current));
            }
            // console.log(current, (result as any as PositionSupport<any>).sort());
            current = Object.getPrototypeOf(current);
        }
        return result;
    }

    public ownMetadata(constructorOrPrototype: any): C {
        if (!this.isOwnDecorated(constructorOrPrototype)) {
            const metadata: C = this.metadataInstanceFactory(constructorOrPrototype);
            Reflect.defineMetadata(this.metadataKey, metadata, constructorOrPrototype);
            return metadata;
        }
        return Reflect.getMetadata(this.metadataKey, constructorOrPrototype);
    }

    public isDecorated(constructorOrPrototype: any): boolean {
        return Reflect.hasMetadata(this.metadataKey, constructorOrPrototype);
    }

    public isOwnDecorated(constructorOrPrototype: any): boolean {
        return Reflect.hasOwnMetadata(this.metadataKey, constructorOrPrototype);
    }
}
