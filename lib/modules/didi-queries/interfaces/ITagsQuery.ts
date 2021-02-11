import { IBeanDefinitionTags } from "../../didi-container/bean/definition/IBeanDefinitionTags.ts";
import { IStringifiable } from "../../didi-commons/lib/types/IStringifiable.ts";
import { Name } from "../../didi-commons/lib/types/Name.ts";

export interface ITagsQuery extends IStringifiable {
    merge(other: ITagsQuery): ITagsQuery;
    match(tags: IBeanDefinitionTags): boolean;
    readonly isEmpty: boolean;
    entries(): [Name, any][];
}
