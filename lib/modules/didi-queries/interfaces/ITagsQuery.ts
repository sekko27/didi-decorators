export interface ITagsQuery {
    merge(other: ITagsQuery): ITagsQuery;
    readonly isEmpty: boolean;
}
