export type BeanType<T> =
    T extends string
        ? StringConstructor
        : T extends number
            ? NumberConstructor
            : T extends boolean
                ? BooleanConstructor
                : new (...args: any[]) => T;
