import { BeanType } from "../../modules/didi-commons/BeanType.ts";
import { Name } from "../../modules/didi-commons/Name.ts";

export interface IAOPMetadata<T, A> {
    type: BeanType<T>;
    name: Name;
    kind: "around" | "before" | "after";
    handler
}
