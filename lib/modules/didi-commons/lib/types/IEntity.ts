import { Name } from "./Name.ts";

export interface IEntity<K extends Name = string> {
    readonly id: K;
}
