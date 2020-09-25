import { ClassMetadataSetter } from "../../modules/didi-commons/metadata/ClassMetadataSetter.ts";
import { Name } from "../../modules/didi-commons/Name.ts";
import { ITagsQuery } from "../../modules/didi-queries/interfaces/ITagsQuery.ts";
import { TagsQuery } from "../../modules/didi-queries/TagsQuery.ts";

export class TagDecorator {
    public static readonly METADATA_KEY: string = "metrix:decorators:tag";
    private static readonly SETTER: ClassMetadataSetter<Map<Name, any>> =
        new ClassMetadataSetter(
            TagDecorator.METADATA_KEY,
            () => new Map()
        );

    public static Tag(key: Name, value: any) {
        return (target: any) => {
            this.raw(target).set(key, value);
        }
    }

    public static tags(target: any): ITagsQuery {
        // TODO TagsQuery uses ref to argument internally!
        return new TagsQuery(this.raw(target));
    }

    private static raw(target: any): Map<Name, any> {
        return this.SETTER.metadata(target);
    }
}
