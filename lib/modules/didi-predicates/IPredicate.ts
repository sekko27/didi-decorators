import { IStringifiable } from "../didi-commons/lib/types/IStringifiable.ts";

export interface IPredicate<T> extends IStringifiable {
    test(value: T): boolean | Promise<boolean>;
}
