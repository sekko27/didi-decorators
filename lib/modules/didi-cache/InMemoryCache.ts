import { ICache } from "./ICache.ts";

export class InMemoryCache<K, V, A extends any[] = []> implements ICache<K, V, A>{
    private readonly cache: Map<K, V> = new Map();

    constructor(private readonly provider: (key: K, ...args: A) => V) {
    }

    get(key: K, ...args: A): V {
        if (!this.cache.has(key)) {
            this.cache.set(key, this.provider(key, ...args));
        }
        return this.cache.get(key) as V;
    }


}
