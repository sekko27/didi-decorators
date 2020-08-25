import { IPredicate } from "./IPredicate.ts";

export class ConstantPredicate<T = any> implements IPredicate<T> {
    public static readonly TRUE: ConstantPredicate = new ConstantPredicate(true);
    public static readonly FALSE: ConstantPredicate = new ConstantPredicate(false);

    constructor(private readonly constant: boolean) {
    }

    test(value: T): boolean | Promise<boolean> {
        return this.constant;
    }

    stringify(): string {
        return `ConstantPredicate[${this.constant}]`;
    }
}
