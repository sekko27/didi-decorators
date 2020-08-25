import { IPredicate } from "./IPredicate.ts";
import { PredicateFunction } from "./PredicateFunction.ts";

export class FunctionalPredicate<T> implements IPredicate<T> {
    constructor(private readonly func: PredicateFunction<T>, private readonly name: string = func.name) {
    }

    test(value: T): boolean | Promise<boolean> {
        return this.func(value);
    }

    stringify(): string {
        return `FunctionalPredicate[${this.name}]`;
    }
}
