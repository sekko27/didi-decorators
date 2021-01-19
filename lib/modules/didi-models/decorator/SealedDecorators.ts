import { ClassMetadataSetter } from "../../didi-commons/metadata/ClassMetadataSetter.ts";
import { BeanType } from "../../didi-commons/BeanType.ts";
import { TypeSupport } from "../../didi-commons/TypeSupport.ts";
import { ISealedDecoratorMetadata } from "../interfaces/ISealedDecoratorMetadata.ts";

export class SealedDecorators {
    public static readonly METADATA_KEY: string = "metrix:decorators:classes:sealed";
    private static readonly SETTER: ClassMetadataSetter<ISealedDecoratorMetadata<any>[]> =
        new ClassMetadataSetter(
            SealedDecorators.METADATA_KEY,
            (target) => []
        );

    public static Implementation(impl: BeanType<any>, customId?: string) {
        const id = customId ?? impl.name;
        return (cls: any) => {
            SealedDecorators.SETTER.metadata(cls).push(SealedDecorators.registrationIgnoringDuplicates(cls, impl, id));
        }
    }

    private static registrationIgnoringDuplicates<T>(cls: any, impl: BeanType<T>, id: string): ISealedDecoratorMetadata<T> {
        if (!TypeSupport.subTypeOf(impl, cls)) {
            throw new TypeError(`Sealed implementation must be based on base class: ${cls.name} - ${impl.name}`);
        }

        const types = SealedDecorators.SETTER.metadata(cls);
        const registered = types.find(md => md.cls === impl || md.id === id);
        if (registered !== undefined) {
            throw new TypeError(`Try to re-register sealed implementation ${impl.name}@${id}. Existing ${registered.cls.name}@${registered.id}`);
        }
        return {id, cls: impl};
    }

    public static isDecorated(cls: any) {
        return SealedDecorators.SETTER.isDecorated(cls);
    }

    public static implementations(cls: any) {
        const firstDecoratedParent = TypeSupport.findSuperClass(cls, SealedDecorators.isDecorated);
    }
}
