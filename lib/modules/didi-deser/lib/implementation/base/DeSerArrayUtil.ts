export class DeSerArrayUtil {
    private static UNORDERED_KEY: symbol = Symbol("UNORDERED");

    public static markAsUnordered(array: any[]): any[] {
        Object.defineProperty(array, DeSerArrayUtil.UNORDERED_KEY, {
            value: true,
            enumerable: false
        });
        return array;
    }

    public static isUnordered(value: any) : boolean {
        return Array.isArray(value) && (value as any)[DeSerArrayUtil.UNORDERED_KEY];
    }

}
