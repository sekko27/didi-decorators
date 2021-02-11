import { IStringifiable } from "../didi-commons/lib/types/IStringifiable.ts";

export interface IUnaryOperator<T, R> extends IStringifiable {
    apply(value: T): R;
}
