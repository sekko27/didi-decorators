import { IBeanDefinitionTags } from "../../didi-container/bean/definition/IBeanDefinitionTags.ts";
import { IStringifiable } from "../../didi-commons/IStringifiable.ts";

export interface ITagsQuery extends IStringifiable {
    merge(other: ITagsQuery): ITagsQuery;
    match(tags: IBeanDefinitionTags): boolean;
    readonly isEmpty: boolean;
}
