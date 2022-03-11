import { BeanType } from "../../modules/didi-commons/lib/types/BeanType.ts";
import { Metadata } from "../../modules/didi-commons/lib/metadata/Metadata.ts";
import { TypeSupport } from "../../modules/didi-commons/lib/utils/TypeSupport.ts";
import { assert } from "std/testing/asserts.ts";

const named = Symbol.for("name");

export interface NamedSealedClass<T> {
    [named]: string;
    type: BeanType<T>;
}

export type SealedClassDescriptor<T = any> = BeanType<T> | NamedSealedClass<T>;

function isNamedSealedDescriptor(descriptor: SealedClassDescriptor): descriptor is NamedSealedClass<any> {
    return descriptor.hasOwnProperty(named);
}

interface ISealedDecoratorMetadata {
    name: string;
    descriptors: NamedSealedClass<any>[];
}

export class SealedDecorators {
    public static readonly METADATA_KEY: string = "metrix:decorators:sealed";
    private static readonly SETTER: Metadata<ISealedDecoratorMetadata> =
        new Metadata(
            SealedDecorators.METADATA_KEY,
            (type) => ({name: type.name, descriptors: []})
        );

    public static forClass(type: BeanType<any>, alias?: string) {
        return (...descriptors: SealedClassDescriptor[]) => {
            return (_target: any) => {
                const wrap = SealedDecorators.named(alias ?? type.name, type);
                SealedDecorators.register(wrap, wrap, ...descriptors);
            }
        };
    }
    private static register(baseDescriptor: NamedSealedClass<any>, ...descriptors: SealedClassDescriptor[]) {
        const md = SealedDecorators.getOrCreateMetadata(baseDescriptor.type);
        md.name = baseDescriptor[named];
        for (const descriptor of descriptors) {
            const wrap = SealedDecorators.wrap(descriptor, baseDescriptor.type);
            const sameName = md.descriptors.find((d) => d[named] === wrap[named]);
            assert(sameName === undefined, `Another sealed class has been defined with same name: ${wrap[named]} for class ${baseDescriptor.type.name}`);
            const sameType = md.descriptors.find((d) => d.type === wrap.type);
            assert(sameType === undefined, `Another sealed class has been defined with same type: ${wrap[named]} and ${sameType?.[named]} for type ${wrap.type} for class ${baseDescriptor.type.name}`);
            md.descriptors.push(wrap);
        }
    }

    private static getOrCreateMetadata(ctr: any): ISealedDecoratorMetadata {
        return SealedDecorators.SETTER.ownMetadata(ctr);
    }

    public static getSealedClasses(ctr: any): NamedSealedClass<any>[] {
        const firstSealedParentPrototype = TypeSupport.findSuperClass(
            ctr.prototype,
            (parentPrototype) => SealedDecorators.SETTER.isOwnDecorated(parentPrototype.constructor)
        );
        if (firstSealedParentPrototype === undefined) {
            return [SealedDecorators.wrap(ctr, ctr)];
        } else {
            return SealedDecorators.getOrCreateMetadata(firstSealedParentPrototype.constructor).descriptors
                .filter((nsc) => TypeSupport.subTypeOf(nsc.type, ctr));
        }
    }

    // TODO Should move to DefaultClassDeSer to pre-initialize map for them
    //  - getChildAlias + getChildClass
    public static getChildAlias(parentConstructor: any, childConstructor: any): string | undefined {
        const match = SealedDecorators.getSealedClasses(parentConstructor).find(nsc => nsc.type === childConstructor);
        return match === undefined ? undefined : match[named];
    }

    public static getChildClass(parentConstructor: any, childAlias: string): BeanType<any> | undefined {
        const match = SealedDecorators.getSealedClasses(parentConstructor).find(nsc => nsc[named] === childAlias);
        return match?.type;
    }

    private static wrap(descriptor: SealedClassDescriptor, base: BeanType<any>) {
        if (isNamedSealedDescriptor(descriptor)) {
            SealedDecorators.ensureInheritance(descriptor.type, base);
            return descriptor;
        } else {
            SealedDecorators.ensureInheritance(descriptor, base);
            return SealedDecorators.named(descriptor.name, descriptor);
        }
    }

    public static named<T>(alias: string, type: BeanType<T>): NamedSealedClass<T> {
        return {type, [named]: alias};
    }

    private static ensureInheritance(type: BeanType<any>, base: BeanType<any>): void {
        assert(TypeSupport.subTypeOf(type, base));
    }
}
