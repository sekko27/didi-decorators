import { PositionSupport } from "alg";
import { IPostConfiguratorMetadata } from "./IPostConfiguratorMetadata.ts";
import { IConfigurator } from "./IConfigurator.ts";
import { PositioningMetadata } from "../../modules/didi-commons/lib/metadata/PositioningMetadata.ts";

export class PostConfiguratorDecorators {
    private static readonly METADATA_KEY: string = "metrix:decorators:post-decorators";
    private static readonly SETTER: PositioningMetadata<IPostConfiguratorMetadata>
        = new PositioningMetadata(PostConfiguratorDecorators.METADATA_KEY);

    static register(ctr: any, id: string, configurator: IConfigurator, positioning?: (p: PositionSupport<any>) => void) {
        const current = PostConfiguratorDecorators.SETTER.ownMetadata(ctr).elem({id, configurator});
        positioning?.(current);
    }

    public static getPostConfigurators(ctr: any): IterableIterator<IPostConfiguratorMetadata> {
        return PostConfiguratorDecorators.SETTER.sort(ctr);
    }
}
