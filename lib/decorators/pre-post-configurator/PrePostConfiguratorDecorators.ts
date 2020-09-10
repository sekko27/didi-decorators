import { PositionSupport } from "../../../deps.ts";
import { ClassMetadataSetter } from "../../modules/didi-commons/metadata/ClassMetadataSetter.ts";
import { IPrePostConfiguratorMetadata } from "./IPrePostConfiguratorMetadata.ts";
import { IConfigurator } from "./IConfigurator.ts";

export class PrePostConfiguratorDecorators {
    public static readonly METADATA_KEY: string = "metrix:decorators:pre-post-decorators";
    private static readonly SETTER: ClassMetadataSetter<PositionSupport<IPrePostConfiguratorMetadata>>
        = new ClassMetadataSetter(
            PrePostConfiguratorDecorators.METADATA_KEY,
        () => new PositionSupport()
        );

    static register<T>(target: any, when: "pre" | "post", id: string, configurator: IConfigurator<T>, positioning?: (p: PositionSupport<any>) => void) {
        const current = PrePostConfiguratorDecorators.SETTER
            .metadata(target).elem({when, id, configurator});
        if (positioning) {
            positioning(current);
        }
    }

    public static getConfigurators(target: any, when: "pre" | "post"): IterableIterator<IPrePostConfiguratorMetadata> {
        return PrePostConfiguratorDecorators
            .SETTER.metadata(target)
            .sort()
            .filter(md => md.when === when)
            [Symbol.iterator]();
    }

    public static registerPre<T>(target: any, id: string, configurator: IConfigurator<T>, positioning?: (p: PositionSupport<any>) => void) {
        PrePostConfiguratorDecorators.register(target, "pre", id, configurator, positioning);
    }

    public static getPreConfigurators(target: any): IterableIterator<IPrePostConfiguratorMetadata> {
        return PrePostConfiguratorDecorators.getConfigurators(target, "pre");
    }

    public static registerPost<T>(target: any, id: string, configurator: IConfigurator<T>, positioning?: (p: PositionSupport<any>) => void) {
        PrePostConfiguratorDecorators.register(target, "post", id, configurator, positioning);
    }

    public static getPostConfigurators(target: any): IterableIterator<IPrePostConfiguratorMetadata> {
        return PrePostConfiguratorDecorators.getConfigurators(target, "post");
    }
}
