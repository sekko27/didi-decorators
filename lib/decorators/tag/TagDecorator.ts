import { Metadata } from "../../modules/didi-commons/lib/metadata/Metadata.ts";
import { Name } from "../../modules/didi-commons/lib/types/Name.ts";
import { ITagsQuery } from "../../modules/didi-queries/interfaces/ITagsQuery.ts";
import { TagsQuery } from "../../modules/didi-queries/TagsQuery.ts";
import { MapUtil } from "../../modules/didi-commons/lib/utils/MapUtil.ts";

// TODO Make test
export class TagDecorator {
    public static readonly METADATA_KEY: string = "metrix:decorators:tag";
    private static readonly SETTER: Metadata<Map<Name, any>> =
        new Metadata(
            TagDecorator.METADATA_KEY,
            () => new Map()
        );

    public static Tag(key: Name, value: any) {
        return (ctr: any) => {
            this.raw(ctr).set(key, value);
        }
    }

    public static tags(ctr: any): ITagsQuery {
        // TODO TagsQuery uses ref to argument internally!
        return new TagsQuery(this.raw(ctr));
    }

    private static raw(ctr: any): Map<Name, any> {
        return this.SETTER.prototypeMetadata(ctr, MapUtil.firstWinReducer, new Map());
    }
}
