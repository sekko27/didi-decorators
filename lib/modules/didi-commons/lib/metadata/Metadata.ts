import "../vendor/!Reflect.ts";
import { TypeSupport } from "../utils/TypeSupport.ts";

export class Metadata<C> {

    constructor(
        private readonly metadataKey: string,
        private readonly metadataInstanceFactory: (target: any) => C,
    ) {
    }

    /**
     * Set metadata field on the target (not necessary in the already defined metadata at different place of the prototype chain).
     *
     * @param target
     * @param field
     * @param value
     */
    public setField<F extends keyof C>(target: any, field: F, value: C[F]): this {
        this.ownMetadata(target)[field] = value;
        return this;
    }

    /**
     * Reduce metadata walking up on the prototype chain. If no metadata has been defined in the chain it will
     * initialize a new one on the current target.
     *
     * @param prototype Prototype object.
     * @param metadataReducer Reducer function called when the current target has own metadata.
     * @param initial Initial value for the reducer.
     * @param targetFromPrototype Mapper function maps the prototype to target (constructor / prototype).
     */
    public prototypeMetadata(
        prototype: any,
        metadataReducer: (memo: C, current: C) => C,
        initial: C,
        targetFromPrototype: (source: any) => any = (source) => source,
    ): C {
        const target = targetFromPrototype(prototype);
        return this.isDecorated(target)
            ? this.reduceMetadata(prototype, metadataReducer, initial, targetFromPrototype)
            : this.initializeOwnMetadata(target);
    }

    /**
     * Retrieve metadata for types (dispatched on class constructor).
     * @param ctr
     * @param metadataReducer
     * @param initial
     */
    public constructorMetadata(ctr: any, metadataReducer: (memo: C, current: C) => C, initial: C): C {
        return this.prototypeMetadata(ctr.prototype, metadataReducer, initial, (source) => source.constructor);
    }

    /**
     * Retrieve own metadata (initialized on the target not at other places in the prototype chain).
     * @param reflectTarget
     */
    public ownMetadata(reflectTarget: any): C {
        return this.isOwnDecorated(reflectTarget)
            ? Reflect.getOwnMetadata(this.metadataKey, reflectTarget)
            : this.initializeOwnMetadata(reflectTarget);
    }

    /**
     * Check metadata existence in the prototype chain.
     * @param reflectTarget
     */
    public isDecorated(reflectTarget: any): boolean {
        return Reflect.hasMetadata(this.metadataKey, reflectTarget);
    }

    /**
     * Check metadata existence only at the target.
     * @param reflectTarget
     */
    public isOwnDecorated(reflectTarget: any): boolean {
        return Reflect.hasOwnMetadata(this.metadataKey, reflectTarget);
    }

    private reduceMetadata(
        prototype: any,
        metadataReducer: (memo: C, current: C) => C,
        initial: C,
        targetFromPrototype: (source: any) => any = (source) => source,
    ): C {
        return TypeSupport.prototypeChainReducer(prototype, (result, current) => {
            const currentTarget = targetFromPrototype(current);
            return this.isOwnDecorated(currentTarget)
                ? metadataReducer(result, this.ownMetadata(currentTarget))
                : result;
        }, initial);
    }

    private initializeOwnMetadata(target: any): C {
        const metadata: C = this.metadataInstanceFactory(target);
        Reflect.defineMetadata(this.metadataKey, metadata, target);
        return metadata;
    }
}


