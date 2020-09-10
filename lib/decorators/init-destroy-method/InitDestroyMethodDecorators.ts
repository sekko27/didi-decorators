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
            const current = this.setter.metadata(target).elem({id: name});
            if (positioning !== undefined) {
                positioning(current);
            }
        }
    }

    public all(target: any): IterableIterator<string> {
        return this.setter.metadata(target).sort().map(md => md.id)[Symbol.iterator]();
    }
}
