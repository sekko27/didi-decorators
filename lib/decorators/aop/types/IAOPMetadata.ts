import { BeanType } from "../../../modules/didi-commons/BeanType.ts";
import { Name } from "../../../modules/didi-commons/Name.ts";
import { IAroundAOPHandler } from "./IAroundAOPHandler.ts";
import { IBeforeAOPHandler } from "./IBeforeAOPHandler.ts";
import { IAfterAOPHandler } from "./IAfterAOPHandler.ts";
import { IQuery } from "../../../modules/didi-queries/interfaces/IQuery.ts";

export interface IAOPMetadata<T extends IAroundAOPHandler<A> | IBeforeAOPHandler<A> | IAfterAOPHandler<A>, A> {
    name: Name;
    kind: "around" | "before" | "after";
    handlerQuery: IQuery<T>;
    handlerArgs: A;
}
