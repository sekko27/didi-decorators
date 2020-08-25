import { IStringifiable } from "../didi-commons/IStringifiable.ts";
import { BeanType } from "../didi-commons/BeanType.ts";
import { Tags } from "./types/Tags.ts";
import { Name } from "../didi-commons/Name.ts";
import { TagsUtil } from "./TagsUtil.ts";

export class TaggedType<T> implements IStringifiable {
    constructor(readonly type: BeanType<T>, readonly tags: Tags) {
    }

    public tag(key: Name, value: any) {
        this.tags.set(key, value);
    }

    public stringify(): string {
        return `TaggedType<${this.type.name}>(${TagsUtil.stringify(this.tags)})`;
    }
}
