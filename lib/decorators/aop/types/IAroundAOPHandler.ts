import { IJoinCut } from "./IJoinCut.ts";
import { Invocation } from "./Invocation.ts";

export interface IAroundAOPHandler<A = void> {
    apply<T, R>(joinCut: IJoinCut<T,  R>, invocation: Invocation<R>, handlerArgs: A): R;
}
