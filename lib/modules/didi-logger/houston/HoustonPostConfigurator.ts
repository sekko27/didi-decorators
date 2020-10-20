import { IPostConfigurator } from "../../didi-container/bean/definition/configuration/post-configurator/IPostConfigurator.ts";
import { LoggerMetadataSetter } from "../decorators/LoggerMetadataSetter.ts";
import { ConsoleTransport, Houston } from "../mod.ts";
import { IPostConfiguratorTarget } from "../../didi-container/bean/definition/configuration/post-configurator/IPostConfiguratorTarget.ts";
import { HoustonFactory } from "./HoustonFactory.ts";
import { IHoustonConfiguration } from "./IHoustonConfiguration.ts";

export class HoustonPostConfigurator implements IPostConfigurator {
    public static readonly ID: string = "houston.logger.didi.metrix";
    public static readonly FACTORY_NAME: symbol = Symbol.for("factory.houston.logger.didi.metrix");
    public static readonly DEFAULT_CONFIGURATION: Map<string, IHoustonConfiguration> = new Map([
        [LoggerMetadataSetter.DEFAULT_LOGGER_NAME, {transports: [new ConsoleTransport()]}]
    ]);

    constructor(private readonly configurations: Map<string, IHoustonConfiguration> = HoustonPostConfigurator.DEFAULT_CONFIGURATION) {
    }

    async configure(target: IPostConfiguratorTarget): Promise<void> {
        target.register(HoustonFactory).instanceOf().as(HoustonPostConfigurator.FACTORY_NAME);
        for (const [name, configuration] of this.configurations) {
            target
                .register(Houston).factory(HoustonFactory, "create")
                .defineParamValue("configuration", configuration)
                .as(LoggerMetadataSetter.createLoggerBeanName(name));
        }
    }
}
