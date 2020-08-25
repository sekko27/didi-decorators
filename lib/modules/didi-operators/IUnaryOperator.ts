import { IStringifiable } from "../didi-commons/IStringifiable.ts";

export interface IUnaryOperator<T, R> extends IStringifiable {
    apply(value: T): R;
}
