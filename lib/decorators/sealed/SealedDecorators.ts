import { BeanType } from "../../modules/didi-commons/BeanType.ts";
import { ClassMetadataSetter } from "../../modules/didi-commons/metadata/ClassMetadataSetter.ts";
import { TypeSupport } from "../../modules/didi-commons/TypeSupport.ts";
import { assert } from "../../../deps.ts";

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
    private static readonly SETTER: ClassMetadataSetter<ISealedDecoratorMetadata> =
        new ClassMetadataSetter(
            SealedDecorators.METADATA_KEY,
            (type) => ({name: type.name, descriptors: []})
        );

    public static forClass(type: BeanType<any>, alias?: string) {
        return (...descriptors: SealedClassDescriptor[]) => {
            return (target: any) => {
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

    private static getOrCreateMetadata(target: any): ISealedDecoratorMetadata {
        return SealedDecorators.SETTER.metadata(target);
    }

    public static getSealedClasses(target: any): NamedSealedClass<any>[] {
        const firstSealedParent = TypeSupport.findSuperClass(target, (parent) => SealedDecorators.SETTER.isDecorated(parent));
        if (firstSealedParent === undefined) {
            return [SealedDecorators.wrap(target, target)];
        } else {
            return SealedDecorators.getOrCreateMetadata(firstSealedParent).descriptors
                .filter((nsc) => TypeSupport.subTypeOf(nsc.type, target));
        }
    }

    // TODO Should move to DefaultClassDeSer to pre-initialize map for them
    //  - getImplementationAlias + getImplementationClass
    public static getImplementationAlias(base: any, implementation: any): string | undefined {
        const match = SealedDecorators.getSealedClasses(base).find(nsc => nsc.type === implementation);
        return match === undefined ? undefined : match[named];
    }

    public static getImplementationClass(base: any, alias: string): BeanType<any> | undefined {
        const match = SealedDecorators.getSealedClasses(base).find(nsc => nsc[named] === alias);
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
