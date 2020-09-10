import { BeanType } from "../../../modules/didi-commons/BeanType.ts";
import { Name } from "../../../modules/didi-commons/Name.ts";
import { IAroundAOPHandler } from "./IAroundAOPHandler.ts";
import { IBeforeAOPHandler } from "./IBeforeAOPHandler.ts";
import { IAfterAOPHandler } from "./IAfterAOPHandler.ts";
import { TaggedTypeQuery } from "../../../modules/didi-tags/TaggedTypeQuery.ts";

export interface IAOPMetadata<T, A> {
    type: BeanType<T>;
    name: Name;
    kind: "around" | "before" | "after";
    handler: TaggedTypeQuery<IAroundAOPHandler<T> | IBeforeAOPHandler<T> | IAfterAOPHandler<T>>;
    handlerArgs: A;
}
