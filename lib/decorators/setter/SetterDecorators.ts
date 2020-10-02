import { ClassMetadataSetter } from "../../modules/didi-commons/metadata/ClassMetadataSetter.ts";
import { ISetterMetadata } from "./ISetterMetadata.ts";
import { PositionSupport } from "../../../deps.ts";
import { IInitDestroyMethodMetadata } from "../init-destroy-method/IInitDestroyMethodMetadata.ts";
import { DecoratorSupport } from "../../modules/didi-commons/metadata/DecoratorSupport.ts";
import { ParamDecorators } from "../param/ParamDecorators.ts";
import { Query } from "../../modules/didi-queries/Query.ts";

export class SetterDecorators {
    public static readonly METADATA_KEY: string = "metrix:decorators:setter";
    private static readonly SETTER: ClassMetadataSetter<PositionSupport<ISetterMetadata<any>>>
        = new ClassMetadataSetter(
            SetterDecorators.METADATA_KEY,
            () => new PositionSupport(),
    );

    public static Setter(positioning?: (position: PositionSupport<IInitDestroyMethodMetadata>) => void) {
        return (target: any, name: string) => {
            const current = SetterDecorators.SETTER.metadata(target).elem({
                id: name,
                query: new Query(DecoratorSupport.paramType(target, name, 0))
            });
            if (positioning !== undefined) {
                positioning(current);
            }
        }
    }

    public static all(target: any): IterableIterator<ISetterMetadata<any>> {
        return SetterDecorators.SETTER
            .metadata(target).sort()
            .map(md => SetterDecorators.extendMetadata(md, target))
                [Symbol.iterator]();
    }

    private static extendMetadata<T>(md: ISetterMetadata<T>, target: any): ISetterMetadata<T> {
        const parameterMetadata = ParamDecorators.methodParams(target, md.id)[0];
        return {...md, query: md.query.merge(parameterMetadata.query)};
    }
}
