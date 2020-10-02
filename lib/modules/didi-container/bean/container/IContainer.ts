import { IBeanResolver } from "../definition/builder/interfaces/IBeanResolver.ts";

export interface IContainer extends IBeanResolver {
    boot(): Promise<this>;
}
