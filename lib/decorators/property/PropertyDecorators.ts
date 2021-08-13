import { Metadata } from "../../modules/didi-commons/lib/metadata/Metadata.ts";
import { IPropertyMetadata } from "./IPropertyMetadata.ts";
import { Name } from "../../modules/didi-commons/lib/types/Name.ts";
import { DecoratorSupport } from "../../modules/didi-commons/lib/metadata/DecoratorSupport.ts";
import { ITagsQuery } from "../../modules/didi-queries/interfaces/ITagsQuery.ts";
import { TagsQuery } from "../../modules/didi-queries/TagsQuery.ts";
import { ArrayElementEqualsOperator, ArrayUtil } from "../../modules/didi-commons/lib/utils/ArrayUtil.ts";

class PropertyDecoratorsImpl {
    private readonly setter: Metadata<IPropertyMetadata<any>[]>;
    private static readonly MetadataEquals: ArrayElementEqualsOperator<IPropertyMetadata<any>>
        = (_1, _2) => _1.name === _2.name;

    constructor(
        metadataKey: string,
    ) {
        this.setter = new Metadata(metadataKey, () => []);
    }

    public Property(tags: ITagsQuery = TagsQuery.EMPTY) {
        return (target: any, name: Name) => {
            console.log(target, name, tags, "PP");
            this.getOrCreateMetadataOnPrototype(target, name).tags = tags;
        }
    }

    public ReadOnly(readonly: boolean = true) {
        return (target: any, name: Name) => {
            this.getOrCreateMetadataOnPrototype(target, name).readonly = readonly;
        }
    }

    public Enumerable(enumerable: boolean = true) {
        return (target: any, name: Name) => {
            this.getOrCreateMetadataOnPrototype(target, name).enumerable = enumerable;
        }

    }

    // TODO Why it's not used?
    public EnableDefault() {
        return (target: any, name: Name) => {
            this.getOrCreateMetadataOnPrototype(target, name).enableDefault = true;
        }
    }

    public all(ctr: any): IterableIterator<IPropertyMetadata<any>> {
        return this.setter.prototypeMetadata(
            ctr.prototype,
            ArrayUtil.concatReducerOnlyFirstByLevels(PropertyDecoratorsImpl.MetadataEquals),
            []
        )[Symbol.iterator]();
    }

    private getOrCreateMetadataOnPrototype(prototype: any, name: Name): IPropertyMetadata<any> {
        const md = this.setter.ownMetadata(prototype).find(md => md.name === name);

        if (md === undefined) {
            const type = DecoratorSupport.fieldType(prototype, name);
            const md = {name, type, enumerable: true, readonly: false, tags: TagsQuery.EMPTY};
            this.setter.ownMetadata(prototype).push(md);
            return md;
        } else {
            return md as IPropertyMetadata<any>;
        }

    }
    public getOrCreateMetadata(ctr: any, name: Name): IPropertyMetadata<any> {
        return this.getOrCreateMetadataOnPrototype(ctr?.prototype, name);
    }
}

export const PropertyDecorators = new PropertyDecoratorsImpl("metrix:decorators:property");
export const ConstructorPropertyDecorators = new PropertyDecoratorsImpl("metrix:decorators:constructor-property");

