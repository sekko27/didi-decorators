export type ArrayElementEqualsOperator<T> = (_1: T, _2: T) => boolean;

export class ArrayUtil {
    public static concatReducer<T = any>(memo: T[], current: T[]): T[] {
        return memo.concat(current);
    }

    public static concatReducerOnlyFirstByLevels<T = any>(equals: ArrayElementEqualsOperator<T>) {
        return (memo: T[], current: T[]): T[] => memo.concat(current.filter(e => undefined === memo.find(re => equals(re, e))));
    }

    public static concatReducerOnlyLastByLevels<T = any>(equals: ArrayElementEqualsOperator<T>) {
        return (memo: T[], current: T[]): T[] => memo.filter(re => undefined === current.find(e => equals(re, e))).concat(current);
    }
}
