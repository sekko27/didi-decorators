export interface IConfigurator<T> {
    configure(configuration: T): Promise<void>;
}
