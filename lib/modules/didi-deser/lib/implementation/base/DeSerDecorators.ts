import { ClassMetadataSetter } from "../../../../didi-commons/lib/metadata/ClassMetadataSetter.ts";
import { IDeSerDecoratorMetadata, IDeSerDecoratorMetadataOptions } from "../../interfaces/IDeSerDecoratorMetadata.ts";
import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";
import { RegistrationDeSerDefinitionProvider } from "../../interfaces/RegistrationDeSerDefinitionProvider.ts";
import { ArrayElementEqualsOperator, ArrayUtil } from "../../../../didi-commons/lib/utils/ArrayUtil.ts";

export class DeSerDecorators {
    public static readonly METADATA_KEY: string = "metrix:decorators:deser";
    private static MetadataEquals: ArrayElementEqualsOperator<IDeSerDecoratorMetadata> =
        (_1, _2) => _1.name === _2.name;

    private static readonly SETTER: ClassMetadataSetter<IDeSerDecoratorMetadata[]> =
        new ClassMetadataSetter(
            DeSerDecorators.METADATA_KEY,
            () => []
        );

    public static register(
        deserDefinitionProvider: RegistrationDeSerDefinitionProvider,
        options: IDeSerDecoratorMetadataOptions = {},
    ) {
        return (prototype: any, field: string) => {
            DeSerDecorators.getOrCreateMetadata(prototype, field, deserDefinitionProvider(prototype, field), options);
        }
    }

    public static isDecorated(cls: any) {
        return DeSerDecorators.SETTER.isDecorated(cls.prototype);
    }

    public static all(cls: any): IDeSerDecoratorMetadata[] {
        return DeSerDecorators.SETTER.metadata(
            cls.prototype,
            ArrayUtil.concatReducerOnlyFirstByLevels(DeSerDecorators.MetadataEquals),
            []
        );
    }

    private static getOrCreateMetadata<T>(
        target: any,
        field: string,
        definition: IDeSerDefinition,
        options: IDeSerDecoratorMetadataOptions = {}
    ): IDeSerDecoratorMetadata {
        const md = DeSerDecorators.SETTER.ownMetadata(target);
        const current = md.find((pmd) => pmd.name === field);
        if (current === undefined) {
            const param: IDeSerDecoratorMetadata = {name: field, definition, options: {alias: field, ...options}};
            md.push(param);
            return param;
        } else {
            return current;
        }
    }
}
