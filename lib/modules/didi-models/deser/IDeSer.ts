import { BeanType } from "../../didi-commons/BeanType.ts";

export interface IDeSer {
    serialize<M>(instance: M): object;
    deserialize<M>(cls: BeanType<M>, source: object): M;
}
