import { IStringifiable } from "../didi-commons/IStringifiable.ts";

export interface IBinaryOperator<T1, T2, R> extends IStringifiable {
    apply(value1: T1, value: T2): R;
}
