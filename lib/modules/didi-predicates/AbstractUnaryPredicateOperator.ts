import { IPredicate } from "./IPredicate.ts";
import { IUnaryOperator } from "../didi-operators/IUnaryOperator.ts";

export abstract class AbstractUnaryPredicateOperator<T> implements IPredicate<T> {
    protected constructor(
        private readonly operator: IUnaryOperator<boolean, boolean | Promise<boolean>>,
        private readonly predicate: IPredicate<T>
    ) {
    }

    async test(value: T): Promise<boolean> {
        return this.operator.apply(await this.predicate.test(value));
    }

    stringify(): string {
        return `${this.operator.stringify()} ${this.predicate.stringify()}`;
    }
}
