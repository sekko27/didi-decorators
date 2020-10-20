import { ParamDecorators } from "../../../decorators/param/ParamDecorators.ts";
import { Houston } from "../mod.ts";
import { IHoustonConfiguration } from "./IHoustonConfiguration.ts";

export class HoustonFactory {
    async create(@ParamDecorators.Inject() configuration: IHoustonConfiguration): Promise<Houston> {
        return new Houston(configuration.transports, configuration.options);
    }
}
