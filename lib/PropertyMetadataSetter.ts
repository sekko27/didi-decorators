import "./modules/didi-commons/vendor/Reflect.ts";
import { DecoratorSupport } from "./DecoratorSupport.ts";
import { ClassMetadataSetter } from "./ClassMetadataSetter.ts";
import { MetadataSetter } from "./MetadataSetter.ts";

type PropertyName<C> = keyof C & string;

interface IPropertyTarget<C = any> {
    readonly cls: C;
    readonly property: PropertyName<C>;
}

export class PropertyMetadataSetter<MD> extends MetadataSetter<IPropertyTarget<any>, MD>{
    private static readonly ANNOTATED_PROPERTIES_METADATA_KEY = "metrix:__annotated_properties__";
    private static readonly ANNOTATED_PROPERTY_REGISTRY: ClassMetadataSetter<Set<string>> =
        new ClassMetadataSetter(
            PropertyMetadataSetter.ANNOTATED_PROPERTIES_METADATA_KEY,
            () => new Set()
        );

    public static annotatedPropertyNames(cls: any): IterableIterator<string> {
        return PropertyMetadataSetter.ANNOTATED_PROPERTY_REGISTRY.metadata(cls).values();
    }

    public static annotatedPropertyNamesByConstructor(ctr: any): IterableIterator<string> {
        return PropertyMetadataSetter.annotatedPropertyNames(ctr.prototype);
    }

    public static annotatedStaticPropertyNamesByConstructor(ctr: any): IterableIterator<string> {
        return PropertyMetadataSetter.annotatedPropertyNames(ctr);
    }

    constructor(
        private readonly metadataKey: string,
        private readonly factory: (target: any, propertyKey: string, propertyType: any) => MD,
    ) {
        super();
    }

    public setField<PC>(constructorOrPrototypeTarget: IPropertyTarget<PC>, field: keyof MD, value: MD[keyof MD]): this {
        this.metadata(constructorOrPrototypeTarget)[field] = value;
        return this;
    }

    public metadata<PC>(constructorOrPrototypeTarget: IPropertyTarget<PC>): MD {
        // Track annotated properties
        PropertyMetadataSetter.ANNOTATED_PROPERTY_REGISTRY.metadata(constructorOrPrototypeTarget.cls).add(constructorOrPrototypeTarget.property);

        if (!Reflect.hasMetadata(this.metadataKey, constructorOrPrototypeTarget.cls, constructorOrPrototypeTarget.property)) {
            const propertyType = DecoratorSupport.fieldType(constructorOrPrototypeTarget.cls, constructorOrPrototypeTarget.property);
            const metadata: MD = this.factory(constructorOrPrototypeTarget.cls, constructorOrPrototypeTarget.property, propertyType);
            Reflect.defineMetadata(this.metadataKey, metadata, constructorOrPrototypeTarget.cls, constructorOrPrototypeTarget.property);
        }
        return Reflect.getMetadata(this.metadataKey, constructorOrPrototypeTarget.cls, constructorOrPrototypeTarget.property);
    }

    protected toPrototypeTarget(constructorTarget: IPropertyTarget): IPropertyTarget {
        return {cls: constructorTarget.cls.prototype, property: constructorTarget.property};
    }

    // TODO Make constructor based field reader (as for metadata)
    public metadataField<PC>(target: IPropertyTarget<PC>, key: keyof MD, defaultValue: MD[keyof MD]): MD[keyof MD] {
        const metadata = this.metadata(target);
        return metadata[key] === undefined ? defaultValue : metadata[key];
    }
}
