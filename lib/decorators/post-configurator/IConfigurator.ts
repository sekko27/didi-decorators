export interface IConfigurator<T> {
    configure(target: T): Promise<void>;
}
