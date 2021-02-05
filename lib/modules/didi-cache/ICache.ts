export interface ICache<K, V, A extends any[]> {
    get(key: K, ...args: A): V;
}
