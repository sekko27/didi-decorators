export class ArrayUtil {
    public static concatReducer<T extends any = any>(memo: T[], current: T[]): T[] {
        return memo.concat(current);
    }
}
