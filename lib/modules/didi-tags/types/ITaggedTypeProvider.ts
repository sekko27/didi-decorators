import { TaggedType } from "../TaggedType.ts";

export interface ITaggedTypeProvider<T> {
    readonly taggedType: TaggedType<T>;
}
