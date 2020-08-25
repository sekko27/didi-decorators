import { IJoinCut } from "./IJoinCut.ts";

export interface IBeforeAOPHandler<A = void> {
    apply<T>(joinCut: IJoinCut<T>, handlerArgs: A): void;
}
