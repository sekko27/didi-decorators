import { ClassMetadataSetter } from "../../modules/didi-commons/metadata/ClassMetadataSetter.ts";
import { IPropertyMetadata } from "./IPropertyMetadata.ts";
import { Name } from "../../modules/didi-commons/Name.ts";
import { DecoratorSupport } from "../../modules/didi-commons/metadata/DecoratorSupport.ts";
import { ITagsQuery } from "../../modules/didi-queries/interfaces/ITagsQuery.ts";
import { TagsQuery } from "../../modules/didi-queries/TagsQuery.ts";
import { ArrayUtil } from "../../modules/didi-commons/ArrayUtil.ts";

class PropertyDecoratorsImpl {
    private readonly setter: ClassMetadataSetter<IPropertyMetadata<any>[]>;

    constructor(
        metadataKey: string,
    ) {
        this.setter = new ClassMetadataSetter(metadataKey, () => []);
    }

    public Property(tags: ITagsQuery = TagsQuery.EMPTY) {
        return (target: any, name: Name) => {
            this.getOrCreateMetadata(target, name).tags = tags;
        }
    }

    public ReadOnly(readonly: boolean = true) {
        return (target: any, name: Name) => {
            this.getOrCreateMetadata(target, name).readonly = readonly;
        }
    }

    public Enumerable(enumerable: boolean = true) {
        return (target: any, name: Name) => {
            this.getOrCreateMetadata(target, name).enumerable = enumerable;
        }

    }

    public EnableDefault() {
        return (target: any, name: Name) => {
            this.getOrCreateMetadata(target, name).enableDefault = true;
        }
    }
    public isTargetDecorated(target: any): boolean {
        return this.all(target).next() !== null;
    }

    public isPropertyDecorated(target: any, name: Name): boolean {
        return this.realPropertyMetadata(target, name) !== undefined;
    }

    public all(target: any): IterableIterator<IPropertyMetadata<any>> {
        return this.setter.metadata(target, ArrayUtil.concatReducer, [])[Symbol.iterator]();
    }

    public propertyMetadata(target: any, name: Name): IPropertyMetadata<any> {
        return this.getOrCreateMetadata(target, name);
    }

    private realPropertyMetadata(target: any, name: Name): IPropertyMetadata<any> | undefined {
        return this.setter.ownMetadata(target).find(md => md.name === name);
    }

    private getOrCreateMetadata(target: any, name: Name): IPropertyMetadata<any> {
        const md = this.realPropertyMetadata(target, name);

        if (md === undefined) {
            const type = DecoratorSupport.fieldType(target, name);
            const md = {name, type, enumerable: true, readonly: false, tags: TagsQuery.EMPTY};
            this.setter.ownMetadata(target).push(md);
            return md;
        } else {
            return md;
        }
    }
}

export const PropertyDecorators = new PropertyDecoratorsImpl("metrix:decorators:property");
export const ConstructorPropertyDecorators = new PropertyDecoratorsImpl("metrix:decorators:constructor-property");

