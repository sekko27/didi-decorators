import { IPredicate } from "./IPredicate.ts";
import { IBinaryOperator } from "../didi-operators/IBinaryOperator.ts";

export abstract class AbstractBinaryPredicateOperator<T> implements IPredicate<T> {
    protected constructor(
        private readonly operator: IBinaryOperator<boolean, boolean, boolean | Promise<boolean>>,
        private readonly predicate1: IPredicate<T>,
        private readonly predicate2: IPredicate<T>,
    ) {
    }

    async test(value: T): Promise<boolean> {
        return this.operator.apply(await this.predicate1.test(value), await this.predicate2.test(value));
    }

    stringify(): string {
        return `${this.predicate1.stringify()} ${this.operator.stringify()} ${this.predicate2.stringify()}`;
    }
}
