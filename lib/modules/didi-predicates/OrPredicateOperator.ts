import { AbstractBinaryPredicateOperator } from "./AbstractBinaryPredicateOperator.ts";
import { IPredicate } from "./IPredicate.ts";
import { ConstantPredicate } from "./ConstantPredicate.ts";
import { IBinaryOperator } from "../didi-operators/IBinaryOperator.ts";

export class OrPredicateOperator<T> extends AbstractBinaryPredicateOperator<T> {
    public static or<T>(predicate1: IPredicate<T>, predicate2: IPredicate<T>): IPredicate<T> {
        switch (true) {
            case predicate1 === ConstantPredicate.TRUE:
            case predicate2 === ConstantPredicate.TRUE:
                return ConstantPredicate.TRUE;
            case predicate1 === ConstantPredicate.FALSE:
                return predicate2;
            case predicate2 === ConstantPredicate.FALSE:
                return predicate1;
            default:
                return new OrPredicateOperator(predicate1, predicate2);
        }
    }

    private static OPERATOR: IBinaryOperator<boolean, boolean, boolean | Promise<boolean>> = {
        apply(value1: boolean, value2: boolean): boolean {
            return value1 || value2;
        },
        stringify(): string {
            return "||";
        },
    };
    
    constructor(predicate1: IPredicate<T>, predicate2: IPredicate<T>) {
        super(OrPredicateOperator.OPERATOR, predicate1, predicate2);
    }
}
