import { BeanType } from "../../../modules/didi-commons/lib/types/BeanType.ts";
import { Name } from "../../../modules/didi-commons/lib/types/Name.ts";

export interface IJoinCut<T, R = void> {
    type: BeanType<T>;
    instance: T;
    methodName: Name;
    args: any[];
}
