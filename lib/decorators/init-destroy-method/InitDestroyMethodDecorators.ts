import { ClassMetadataSetter } from "../../modules/didi-commons/metadata/ClassMetadataSetter.ts";
import { PositionSupport } from "../../../deps.ts";
import { IInitDestroyMethodMetadata } from "./IInitDestroyMethodMetadata.ts";

export class InitDestroyMethodDecorators {
    private readonly setter: ClassMetadataSetter<PositionSupport<IInitDestroyMethodMetadata>>;

    constructor(readonly metadataKey: string) {
        this.setter = new ClassMetadataSetter(metadataKey, () => new PositionSupport());
    }

    public decorator(positioning?: (position: PositionSupport<IInitDestroyMethodMetadata>) => void) {
        return (target: any, name: string) => {
            const current = this.setter.ownMetadata(target).elem({id: name});
            if (positioning !== undefined) {
                positioning(current);
            }
        }
    }

    public all(ctr: any): IterableIterator<string> {
        const positioning = this.setter.metadata(
            ctr.prototype,
            PositionSupport.concatReducer,
            new PositionSupport()
        );
        return positioning.sort().map((md: IInitDestroyMethodMetadata) => md.id)[Symbol.iterator]();
    }
}
