import { IPostConfiguratorTarget } from "./IPostConfiguratorTarget.ts";
import { IConfigurator } from "../../../../../../decorators/post-configurator/IConfigurator.ts";

export interface IPostConfigurator extends IConfigurator<IPostConfiguratorTarget> {
}
