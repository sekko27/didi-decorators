import "../vendor/Reflect.ts";
import { MetadataSetter } from "./MetadataSetter.ts";

/**
 * Per target (prototype / constructor) metadata setter when the metadata can be specified by type.
 */
export class ClassMetadataSetter<C> extends MetadataSetter<any, C> {

    constructor(private readonly metadataKey: string, private readonly metadataInstanceFactory: (target: any) => C) {
        super();
    }

    public setField<F extends keyof C>(target: any, field: F, value: C[F]): this {
        this.metadata(target)[field] = value;
        return this;
    }

    public metadata(constructorOrPrototype: any): C {
        if (!this.isDecorated(constructorOrPrototype)) {
            const metadata: C = this.metadataInstanceFactory(constructorOrPrototype);
            Reflect.defineMetadata(this.metadataKey, metadata, constructorOrPrototype);
            return metadata;
        }
        return Reflect.getMetadata(this.metadataKey, constructorOrPrototype);
    }

    public isDecorated(constructorOrPrototype: any): boolean {
        return Reflect.hasMetadata(this.metadataKey, constructorOrPrototype);
    }


    protected toPrototypeTarget(constructorTarget: any): any {
        return constructorTarget.prototype;
    }
}
