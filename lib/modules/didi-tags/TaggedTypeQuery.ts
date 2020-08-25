import { IPredicate } from "../didi-predicates/IPredicate.ts";
import { ITaggedTypeProvider } from "./types/ITaggedTypeProvider.ts";
import { BeanType } from "../didi-commons/BeanType.ts";
import { ITagsPredicate } from "./types/ITagsPredicate.ts";
import { TypeSupport } from "../didi-commons/TypeSupport.ts";

export class TaggedTypeQuery<T> implements IPredicate<ITaggedTypeProvider<T>> {
    public static readonly NAME_TAG: string = "__name__";

    constructor(readonly type: BeanType<T>, private readonly tagsPredicate: ITagsPredicate) {
    }

    public async test(bd: ITaggedTypeProvider<T>): Promise<boolean> {
        const {taggedType} = bd;
        return TypeSupport.subTypeOf(taggedType.type, this.type) && (await this.tagsPredicate.test(taggedType.tags));
    }

    stringify(): string {
        return `TaggedTypeQuery<${this.type.name}>[${this.tagsPredicate.stringify()}]`;
    }


}
