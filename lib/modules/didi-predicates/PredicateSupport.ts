import { IPredicate } from "./IPredicate.ts";
import { AndPredicateOperator } from "./AndPredicateOperator.ts";
import { OrPredicateOperator } from "./OrPredicateOperator.ts";
import { NegatePredicateOperator } from "./NegatePredicateOperator.ts";
import { ConstantPredicate } from "./ConstantPredicate.ts";

export class PredicateSupport {
    public static readonly TRUE: ConstantPredicate = ConstantPredicate.TRUE;
    public static readonly FALSE: ConstantPredicate = ConstantPredicate.FALSE;

    public static and<T>(predicate1: IPredicate<T>, predicate2: IPredicate<T>): IPredicate<T> {
        return AndPredicateOperator.and(predicate1, predicate2);
    }

    public static or<T>(predicate1: IPredicate<T>, predicate2: IPredicate<T>): IPredicate<T> {
        return OrPredicateOperator.or(predicate1, predicate2);
    }

    public static not<T>(predicate: IPredicate<T>): IPredicate<T> {
        return NegatePredicateOperator.not(predicate);
    }
}
