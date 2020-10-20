import { PostConfiguratorDecorators } from "../../../decorators/post-configurator/PostConfiguratorDecorators.ts";
import { HoustonPostConfigurator } from "./HoustonPostConfigurator.ts";
import { IHoustonConfiguration } from "./IHoustonConfiguration.ts";


export function EnableHouston(configurations?: Map<string, IHoustonConfiguration>) {
    return (target: any) => {
        PostConfiguratorDecorators.register(
            target,
            HoustonPostConfigurator.ID,
            new HoustonPostConfigurator(configurations),
        );
    }
}
