import { ClassMetadataSetter } from "../ClassMetadataSetter.ts";
import { IPropertyMetadata } from "./IPropertyMetadata.ts";
import { Name } from "../modules/didi-commons/Name.ts";
import { TypeSupport } from "../modules/didi-commons/TypeSupport.ts";
import { DecoratorSupport } from "../DecoratorSupport.ts";
import { TagsPredicates } from "../modules/didi-tags/TagsPredicates.ts";
import { PredicateSupport } from "../modules/didi-predicates/PredicateSupport.ts";
import { ITagsPredicate } from "../modules/didi-tags/types/ITagsPredicate.ts";

export class PropertyDecorators {
    public static readonly METADATA_KEY: string = "metrix:decorators:property";
    private static SETTER: ClassMetadataSetter<IPropertyMetadata<any>[]>
        = new ClassMetadataSetter(
            PropertyDecorators.METADATA_KEY,
            () => []
        );

    public static Property(tags: ITagsPredicate = PredicateSupport.TRUE) {
        return (target: any, name: Name) => {
            PropertyDecorators.getOrCreateMetadata(target, name).tags = tags;
        }
    }

    public static ReadOnly(readonly: boolean = true) {
        return (target: any, name: Name) => {
            PropertyDecorators.getOrCreateMetadata(target, name).readonly = readonly;
        }
    }

    public static Enumerable(enumerable: boolean = true) {
        return (target: any, name: Name) => {
            PropertyDecorators.getOrCreateMetadata(target, name).enumerable = enumerable;
        }

    }
    public static isTargetDecorated(target: any): boolean {
        return PropertyDecorators.SETTER.metadata(target).length > 0;
    }

    public static isPropertyDecorated(target: any, name: Name): boolean {
        return PropertyDecorators.realPropertyMetadata(target, name) !== undefined;
    }

    public static all(target: any): IterableIterator<IPropertyMetadata<any>> {
        return PropertyDecorators.SETTER.metadata(target)[Symbol.iterator]();
    }

    public static propertyMetadata(target: any, name: Name): IPropertyMetadata<any> {
        return PropertyDecorators.getOrCreateMetadata(target, name);
    }

    private static realPropertyMetadata(target: any, name: Name): IPropertyMetadata<any> | undefined {
        return PropertyDecorators.SETTER.metadata(target).find(md => md.name === name);
    }

    private static getOrCreateMetadata(target: any, name: Name): IPropertyMetadata<any> {
        const md = PropertyDecorators.realPropertyMetadata(target, name);

        if (md === undefined) {
            const type = DecoratorSupport.fieldType(target, name);
            const md = {name, type, enumerable: true, readonly: false, tags: PredicateSupport.TRUE};
            PropertyDecorators.SETTER.metadata(target).push(md);
            return md;
        } else {
            return md;
        }
    }
}
