import { ClassMetadataSetter } from "../../modules/didi-commons/lib/metadata/ClassMetadataSetter.ts";
import { ISetterMetadata } from "./ISetterMetadata.ts";
import { PositionSupport } from "../../../deps.ts";
import { IInitDestroyMethodMetadata } from "../init-destroy-method/IInitDestroyMethodMetadata.ts";
import { DecoratorSupport } from "../../modules/didi-commons/lib/metadata/DecoratorSupport.ts";
import { ParamDecorators } from "../param/ParamDecorators.ts";
import { Query } from "../../modules/didi-queries/Query.ts";

export class SetterDecorators {
    public static readonly METADATA_KEY: string = "metrix:decorators:setter";
    private static readonly SETTER: ClassMetadataSetter<PositionSupport<ISetterMetadata>>
        = new ClassMetadataSetter(
            SetterDecorators.METADATA_KEY,
            () => new PositionSupport(),
    );

    public static Setter(positioning?: (position: PositionSupport<ISetterMetadata>) => void) {
        return (prototype: any, name: string) => {
            const current = SetterDecorators.SETTER.ownMetadata(prototype).elem({
                id: name,
                query: new Query(DecoratorSupport.paramType(prototype, name, 0))
            });
            if (positioning !== undefined) {
                positioning(current);
            }
        }
    }

    public static all(ctr: any): IterableIterator<ISetterMetadata> {
        return SetterDecorators.SETTER
            .metadata(ctr.prototype, PositionSupport.concatReducer, new PositionSupport)
            .sort()
            .map(md => SetterDecorators.extendMetadata(md, ctr))
                [Symbol.iterator]();
    }

    private static extendMetadata<T>(md: ISetterMetadata<T>, ctr: any): ISetterMetadata<T> {
        const parameterMetadata = ParamDecorators.methodParams(ctr, md.id)[0];
        return {...md, query: md.query.merge(parameterMetadata.query)};
    }
}
