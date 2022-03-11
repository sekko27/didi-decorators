import { PositionSupport } from "alg";
import { IInitDestroyMethodMetadata } from "./IInitDestroyMethodMetadata.ts";
import { PositioningMetadata } from "../../modules/didi-commons/lib/metadata/PositioningMetadata.ts";

/**
 * Decorators support init / destroy (after instantiation / after removing from container) methods.
 *
 * These decorate on methods, so metadata will be written on prototype.
 *
 * It supports ordered execution by position support.
 */
export class InitDestroyMethodDecorators {
    private readonly setter: PositioningMetadata<IInitDestroyMethodMetadata>;

    constructor(readonly metadataKey: string) {
        this.setter = new PositioningMetadata<IInitDestroyMethodMetadata>(metadataKey);
    }

    /**
     * Define init/destroy method. Optionally you can specify order.
     *
     * ```typescript
     *     class A {
     *         @Init(pos => pos.before("init2"))
     *         init1() {}
     *
     *         @Init()
     *         init2() {}
     *     }
     * ```
     * @param positioning Optional position callback.
     */
    public decorator(positioning?: (position: PositionSupport<IInitDestroyMethodMetadata>) => void) {
        return (prototype: any, name: string) => {
            this.setter.add(prototype, {id: name}, positioning);
        }
    }

    /**
     * Retrieve init / destroy method names in order (defined by positioning).
     */
    public all(ctr: any): IterableIterator<string> {
        return this.setter.mapSort(ctr.prototype, (e) => e.id);
    }
}
