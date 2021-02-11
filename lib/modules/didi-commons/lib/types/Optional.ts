export class Optional<T> {
    public static of<V>(value: V): Optional<V> {
        if (value === undefined) {
            throw new TypeError(`Defined value expected`);
        }
        return new Optional(value);
    }

    public static optional<V>(value?: V): Optional<V> {
        return value === undefined ? Optional.NONE : new Optional(value);
    }

    public static empty(): Optional<any> {
        return Optional.NONE;
    }

    public static readonly NONE: Optional<any> = new Optional(undefined);

    constructor(readonly value: T) {
    }

    public get isPresent(): boolean {
        return this.value !== undefined;
    }

    public getOrDefault(def: T): T {
        return this.isPresent ? this.value : def;
    }

    public getOrThrow(errorProvider: () => Error): T {
        if (this.isPresent) {
            return this.value;
        }
        throw errorProvider();
    }
}
