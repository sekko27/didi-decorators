import { TypeSupport } from "./TypeSupport.ts";

export class MapUtil {
    public static entryToString(key: any, value: any): string {
        const valueString =
            value instanceof Map
                ? MapUtil.toString(value)
                : TypeSupport.isStringifiable(value) ? value.stringify() : value;
        return `${String(key)} => ${valueString}`;
    }

    public static toString(map: Map<any, any>): string {
        const entries = Array.from(map.entries())
            .map(([k, v]) => MapUtil.entryToString(k, v))
            .join(", ");
        return `{${entries}}`;
    }

    public static firstWinReducer<K = any, V = any>(_1: Map<K, V>, _2: Map<K, V>): Map<K, V> {
        return new Map(Array.from(_2.entries()).concat(Array.from(_1.entries())));
    }
}
