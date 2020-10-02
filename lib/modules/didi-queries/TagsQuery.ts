import { ITagsQuery } from "./interfaces/ITagsQuery.ts";
import { Name } from "../didi-commons/Name.ts";
import { IBeanDefinitionTags } from "../didi-container/bean/definition/IBeanDefinitionTags.ts";
import { ParamDecorators } from "../../decorators/param/ParamDecorators.ts";

export class TagsQuery implements ITagsQuery {
    public static readonly EMPTY: TagsQuery = new TagsQuery();

    public static pair(name: Name, value: any): [Name, any] {
        return [name, value];
    }

    public static pairEntry(name: Name, value: any): Map<Name, any> {
        return new Map([this.pair(name, value)]);
    }
    public static byName(name: Name): TagsQuery {
        return new TagsQuery(this.pairEntry(ParamDecorators.NAME_TAG, name));
    }

    private stringRepresentationCache?: string;

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

    match(tags: IBeanDefinitionTags): boolean {
        for (const [k, v] of this.map.entries()) {
            if (!tags.has(k) || tags.get(k) !== v) {
                return false;
            }
        }
        return true;
    }

    stringify(): string {
        if (this.stringRepresentationCache === undefined) {
            this.stringRepresentationCache = Array.from(this.map.entries()).map(([k, v]) => `${String(k)}=${v}`).join(",");
        }
        return this.stringRepresentationCache;
    }


}
