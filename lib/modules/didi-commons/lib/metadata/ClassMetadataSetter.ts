import "../vendor/Reflect.ts";

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

    public metadata(prototype: any, reducer: (memo: C, current: C) => C, initial: C, prototypeMap: (source: any) => any = (source) => source): C {
        const mapped = prototypeMap(prototype);
        if (!this.isDecorated(mapped)) {
            const metadata: C = this.metadataInstanceFactory(mapped);
            Reflect.defineMetadata(this.metadataKey, metadata, mapped);
            return metadata;
        }
        let result: C = initial;
        for (let current = prototype; current !== null; current = Object.getPrototypeOf(current)) {
            const currentMapped = prototypeMap(current);
            if (this.isOwnDecorated(currentMapped)) {
                result = reducer(result, this.ownMetadata(currentMapped));
            }
        }
        return result;
    }

    public constructorMetadata(ctr: any, reducer: (memo: C, current: C) => C, initial: C): C {
        return this.metadata(ctr.prototype, reducer, initial, (source) => source.constructor);
    }

    public ownMetadata(reflectTarget: any): C {
        if (!this.isOwnDecorated(reflectTarget)) {
            const metadata: C = this.metadataInstanceFactory(reflectTarget);
            Reflect.defineMetadata(this.metadataKey, metadata, reflectTarget);
            return metadata;
        }
        return Reflect.getMetadata(this.metadataKey, reflectTarget);
    }

    public isDecorated(reflectTarget: any): boolean {
        return Reflect.hasMetadata(this.metadataKey, reflectTarget);
    }

    public isOwnDecorated(reflectTarget: any): boolean {
        return Reflect.hasOwnMetadata(this.metadataKey, reflectTarget);
    }
}
