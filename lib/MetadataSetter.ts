export abstract class MetadataSetter<T, MD> {
    public abstract metadata(constructorOrPrototypeTarget: T): MD;
    protected abstract toPrototypeTarget(constructorTarget: T): T;

    /**
     * Usually we read metadata by class constructor.
     * This method helps us to read metadata for its prototype, because
     * decorators use prototype targets for properties / methods (non-static).
     *
     * @param ctr Class constructor.
     */
    public prototypeMetadata(ctr: any): MD {
        return this.metadata(this.toPrototypeTarget(ctr));
    }
}
