export abstract class MetadataSetter<T, MD> {
    public abstract metadata(prototype: T, reducer: (memo: MD, current: MD) => MD, initial: MD): MD;
    public abstract ownMetadata(prototype: T): MD;
}
