import { PrePostConfiguratorDecorators } from "./PrePostConfiguratorDecorators.ts";

export interface IConfigurator<T> {
    configure(configuration: T): Promise<void>;
}
