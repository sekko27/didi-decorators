import { AbstractBinaryPredicateOperator } from "./AbstractBinaryPredicateOperator.ts";
import { IPredicate } from "./IPredicate.ts";
import { ConstantPredicate } from "./ConstantPredicate.ts";
import { IBinaryOperator } from "../didi-operators/IBinaryOperator.ts";

export class AndPredicateOperator<T> extends AbstractBinaryPredicateOperator<T> {
    public static and<T>(predicate1: IPredicate<T>, predicate2: IPredicate<T>): IPredicate<T> {
        switch (true) {
            case predicate1 === ConstantPredicate.TRUE:
                return predicate2;
            case predicate2 === ConstantPredicate.TRUE:
                return predicate1;
            case predicate1 === ConstantPredicate.FALSE:
            case predicate2 === ConstantPredicate.FALSE:
                return ConstantPredicate.FALSE;
            default:
                return new AndPredicateOperator(predicate1, predicate2);
        }
    }

    private static OPERATOR: IBinaryOperator<boolean, boolean, boolean | Promise<boolean>> = {
        apply(value1: boolean, value2: boolean): boolean {
            return value1 && value2;
        },
        stringify(): string {
            return "&&";
        },
    };
    
    constructor(predicate1: IPredicate<T>, predicate2: IPredicate<T>) {
        super(AndPredicateOperator.OPERATOR, predicate1, predicate2);
    }
}
