export type ElementBasedProvider<E = any, R = any> = (elem: E) => R;
export type ArrayElementKeyValueProvider = {
    key: ElementBasedProvider,
    value: ElementBasedProvider
}
export class DeSerArrayUtil {
    private static UNORDERED_KEY: symbol = Symbol("UNORDERED");
    private static UNORDERED_KEY_PROVIDER_KEY: symbol = Symbol("KEY_PROVIDER");
    private static UNORDERED_VALUE_PROVIDER_KEY: symbol = Symbol("VALUE_PROVIDER");

    public static markAsUnordered(array: any[], elementKeyProvider: (elem: any) => any, elementValueProvider: (elem: any) => any): any[] {
        Object.defineProperty(array, DeSerArrayUtil.UNORDERED_KEY, {value: true, enumerable: false});
        Object.defineProperty(array, DeSerArrayUtil.UNORDERED_KEY_PROVIDER_KEY, {value: elementKeyProvider, enumerable: false});
        Object.defineProperty(array, DeSerArrayUtil.UNORDERED_VALUE_PROVIDER_KEY, {value: elementValueProvider, enumerable: false});
        return array;
    }

    public static getKeyValueProviderForUnorderedArray(value: any) : ArrayElementKeyValueProvider | undefined {
        return Array.isArray(value) && (value as any)[DeSerArrayUtil.UNORDERED_KEY] === true
            ? {key: (value as any)[DeSerArrayUtil.UNORDERED_KEY_PROVIDER_KEY], value: (value as any)[DeSerArrayUtil.UNORDERED_VALUE_PROVIDER_KEY]}
            : undefined;
    }

}
