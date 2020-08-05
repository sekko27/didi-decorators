import "./vendor/Reflect.ts";
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

    public metadata(target: any): C {
        if (!Reflect.hasMetadata(this.metadataKey, target)) {
            const metadata: C = this.metadataInstanceFactory(target);
            Reflect.defineMetadata(this.metadataKey, metadata, target);
            return metadata;
        }
        return Reflect.getMetadata(this.metadataKey, target);
    }

    protected toPrototypeTarget(target: any): any {
        return target.prototype;
    }
}
