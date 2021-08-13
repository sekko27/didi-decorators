import { PositionSupport } from "../../../deps.ts";
import { Metadata } from "../../modules/didi-commons/lib/metadata/Metadata.ts";
import { IPostConfiguratorMetadata } from "./IPostConfiguratorMetadata.ts";
import { IConfigurator } from "./IConfigurator.ts";

export class PostConfiguratorDecorators {
    public static readonly METADATA_KEY: string = "metrix:decorators:post-decorators";
    private static readonly SETTER: Metadata<PositionSupport<IPostConfiguratorMetadata>>
        = new Metadata(
            PostConfiguratorDecorators.METADATA_KEY,
        () => new PositionSupport()
        );

    static register<T>(ctr: any, id: string, configurator: IConfigurator<T>, positioning?: (p: PositionSupport<any>) => void) {
        const current = PostConfiguratorDecorators.SETTER
            .ownMetadata(ctr).elem({id, configurator});
        if (positioning) {
            positioning(current);
        }
    }

    public static getPostConfigurators(ctr: any): IterableIterator<IPostConfiguratorMetadata> {
        return PostConfiguratorDecorators
            .SETTER.constructorMetadata(ctr, PositionSupport.concatReducer, new PositionSupport())
            .sort()
            [Symbol.iterator]();
    }
}
