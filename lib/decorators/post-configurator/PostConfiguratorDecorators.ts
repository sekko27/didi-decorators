import { PositionSupport } from "../../../deps.ts";
import { ClassMetadataSetter } from "../../modules/didi-commons/metadata/ClassMetadataSetter.ts";
import { IPostConfiguratorMetadata } from "./IPostConfiguratorMetadata.ts";
import { IConfigurator } from "./IConfigurator.ts";

export class PostConfiguratorDecorators {
    public static readonly METADATA_KEY: string = "metrix:decorators:post-decorators";
    private static readonly SETTER: ClassMetadataSetter<PositionSupport<IPostConfiguratorMetadata>>
        = new ClassMetadataSetter(
            PostConfiguratorDecorators.METADATA_KEY,
        () => new PositionSupport()
        );

    static register<T>(target: any, id: string, configurator: IConfigurator<T>, positioning?: (p: PositionSupport<any>) => void) {
        const current = PostConfiguratorDecorators.SETTER
            .ownMetadata(target).elem({id, configurator});
        if (positioning) {
            positioning(current);
        }
    }

    public static getPostConfigurators(target: any): IterableIterator<IPostConfiguratorMetadata> {
        return PostConfiguratorDecorators
            .SETTER.metadata(target, PositionSupport.concatReducer, new PositionSupport)
            .sort()
            [Symbol.iterator]();
    }
}
