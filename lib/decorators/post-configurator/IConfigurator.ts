export interface IConfigurator<T = any> {
    configure(target: T): Promise<void>;
}
