import {
    IBeanResolverForClient,
} from "../definition/builder/interfaces/IBeanResolverForFactory.ts";

export interface IContainer extends IBeanResolverForClient {
    boot(): Promise<this>;
}
