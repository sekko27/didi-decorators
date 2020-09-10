import { IJoinCut } from "./IJoinCut.ts";

export interface IAfterAOPHandler<A = void> {
    apply<T, R>(joinCut: IJoinCut<T>, result: R, handlerArgs: A): void;
}
