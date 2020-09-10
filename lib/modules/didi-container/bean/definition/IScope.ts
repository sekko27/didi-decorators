export interface IScope<T> {
    get(): Promise<T>;
}
