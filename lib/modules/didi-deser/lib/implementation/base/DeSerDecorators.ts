import { ClassMetadataSetter } from "../../../../didi-commons/metadata/ClassMetadataSetter.ts";
import { IDeSerDecoratorMetadata, IDeSerDecoratorMetadataOptions } from "../../interfaces/IDeSerDecoratorMetadata.ts";
import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";
import { RegistrationDeSerDefinitionProvider } from "../../interfaces/RegistrationDeSerDefinitionProvider.ts";

export class DeSerDecorators {
    public static readonly METADATA_KEY: string = "metrix:decorators:deser";
    private static readonly SETTER: ClassMetadataSetter<IDeSerDecoratorMetadata[]> =
        new ClassMetadataSetter(
            DeSerDecorators.METADATA_KEY,
            () => []
        );

    public static register(
        deserDefinitionProvider: RegistrationDeSerDefinitionProvider,
        options: IDeSerDecoratorMetadataOptions = {},
    ) {
        return (cls: any, field: string) => {
            DeSerDecorators.getOrCreateMetadata(cls, field, deserDefinitionProvider(cls, field), options);
        }
    }

    public static isDecorated(cls: any) {
        return DeSerDecorators.SETTER.isDecorated(cls);
    }

    public static all(cls: any): IDeSerDecoratorMetadata[] {
        return DeSerDecorators.SETTER.metadata(cls.prototype);
    }

    private static getOrCreateMetadata<T>(
        target: any,
        field: string,
        definition: IDeSerDefinition,
        options: IDeSerDecoratorMetadataOptions = {}
    ): IDeSerDecoratorMetadata {
        const md = DeSerDecorators.SETTER.metadata(target);
        const current = md.find((pmd) => pmd.name === field);
        return current === undefined ? DeSerDecorators.addMetadata(md, field, definition, options) : current;
    }

    private static addMetadata(
        md: IDeSerDecoratorMetadata[],
        name: string,
        definition: IDeSerDefinition,
        options: IDeSerDecoratorMetadataOptions = {},
    ): IDeSerDecoratorMetadata {
        const param: IDeSerDecoratorMetadata = {name, definition, options: {alias: name, ...options}};
        md.push(param);
        return param;
    }
}
