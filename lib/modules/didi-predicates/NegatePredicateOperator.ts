import { IPredicate } from "./IPredicate.ts";
import { ConstantPredicate } from "./ConstantPredicate.ts";
import { AbstractUnaryPredicateOperator } from "./AbstractUnaryPredicateOperator.ts";
import { IUnaryOperator } from "../didi-operators/IUnaryOperator.ts";

export class NegatePredicateOperator<T> extends AbstractUnaryPredicateOperator<T> {
    public static not<T>(predicate: IPredicate<T>): IPredicate<T> {
        switch (true) {
            case predicate === ConstantPredicate.TRUE:
                return ConstantPredicate.FALSE;
            case predicate === ConstantPredicate.FALSE:
                return ConstantPredicate.TRUE;
            default:
                return new NegatePredicateOperator(predicate);
        }
    }

    private static OPERATOR: IUnaryOperator<boolean, boolean | Promise<boolean>> = {
        apply(value: boolean): boolean {
            return !value;
        },
        stringify(): string {
            return "\u00AC";
        },
    };
    
    constructor(predicate: IPredicate<T>) {
        super(NegatePredicateOperator.OPERATOR, predicate);
    }
}
