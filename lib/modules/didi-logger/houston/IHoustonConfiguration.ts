import { ITransport, Options } from "../mod.ts";

export interface IHoustonConfiguration {
    transports: ITransport[];
    options?: Options;
}
