import { IEntity } from "../../modules/didi-commons/IEntity.ts";
import { IConfigurator } from "./IConfigurator.ts";

export interface IPrePostConfiguratorMetadata<T = any> extends IEntity {
    readonly id: string;
    readonly when: "pre" | "post";
    readonly configurator: IConfigurator<T>;
}
