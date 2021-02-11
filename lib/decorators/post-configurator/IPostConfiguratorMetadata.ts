import { IEntity } from "../../modules/didi-commons/lib/types/IEntity.ts";
import { IConfigurator } from "./IConfigurator.ts";

export interface IPostConfiguratorMetadata<T = any> extends IEntity {
    readonly id: string;
    readonly configurator: IConfigurator<T>;
}
