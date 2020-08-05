import "./vendor/Reflect.ts";
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

    public setField<PC>(target: IPropertyTarget<PC>, field: keyof MD, value: MD[keyof MD]): this {
        this.metadata(target)[field] = value;
        return this;
    }

    public metadata<PC>(target: IPropertyTarget<PC>): MD {
        // Track annotated properties
        PropertyMetadataSetter.ANNOTATED_PROPERTY_REGISTRY.metadata(target.cls).add(target.property);

        if (!Reflect.hasMetadata(this.metadataKey, target.cls, target.property)) {
            const propertyType = DecoratorSupport.fieldType(target.cls, target.property);
            const metadata: MD = this.factory(target.cls, target.property, propertyType);
            Reflect.defineMetadata(this.metadataKey, metadata, target.cls, target.property);
        }
        return Reflect.getMetadata(this.metadataKey, target.cls, target.property);
    }

    protected toPrototypeTarget(target: IPropertyTarget): IPropertyTarget {
        return {cls: target.cls.prototype, property: target.property};
    }


    public metadataField<PC>(target: IPropertyTarget<PC>, key: keyof MD, defaultValue: MD[keyof MD]): MD[keyof MD] {
        const metadata = this.metadata(target);
        return metadata[key] === undefined ? defaultValue : metadata[key];
    }
}
