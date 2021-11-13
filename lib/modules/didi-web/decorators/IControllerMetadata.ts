import type { BeanType } from "../../didi-commons/lib/types/BeanType.ts";
import type { IActionMetadata } from "./IActionMetadata.ts";

export interface IControllerMetadata<T> {
    name: string;
    controller: BeanType<T>;
    path: string;
    actions: IActionMetadata[];
    description?: string;
}
