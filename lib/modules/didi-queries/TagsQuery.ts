import { ITagsQuery } from "./interfaces/ITagsQuery.ts";
import { Name } from "../didi-commons/Name.ts";

export class TagsQuery implements ITagsQuery {
    public static readonly EMPTY: TagsQuery = new TagsQuery();

    constructor(private readonly map: Map<Name, any> = new Map()) {
    }

    merge(other: TagsQuery): ITagsQuery {
        return other.isEmpty
            ? this
            : this.isEmpty
                ? other
                : new TagsQuery(
                    new Map(
                        Array.from(this.map.entries())
                            .concat(Array.from(other.map.entries()))
                    )
                );
    }

    get isEmpty(): boolean {
        return this.map.size === 0;
    }

    public static tagQuery(name: Name, value: any): ITagsQuery {
        return new TagsQuery(new Map([[name, value]]));
    }
}
