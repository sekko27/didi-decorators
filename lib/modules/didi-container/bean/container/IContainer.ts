import {
    IBeanResolverForClient,
    IBeanResolverForFactory
} from "../definition/builder/interfaces/IBeanResolverForFactory.ts";

export interface IContainer extends IBeanResolverForFactory, IBeanResolverForClient {
    boot(): Promise<this>;
}
