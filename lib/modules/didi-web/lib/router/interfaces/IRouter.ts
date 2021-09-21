import { IRouterContext } from "./IRouterContext.ts";
import { Optional } from "../../../../didi-commons/lib/types/Optional.ts";

export interface IRouter {
    route(context: IRouterContext): Promise<Optional<Response>>;
}
