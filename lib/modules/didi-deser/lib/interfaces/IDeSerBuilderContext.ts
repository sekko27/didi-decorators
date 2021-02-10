import { IDeSerBuilder } from "./IDeSerBuilder.ts";

export interface IDeSerBuilderContext {
    manager: IDeSerBuilder;
    path: string[];
}
