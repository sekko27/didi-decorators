import { IStringifiable } from "../didi-commons/IStringifiable.ts";

export interface IPredicate<T> extends IStringifiable {
    test(value: T): boolean | Promise<boolean>;
}
