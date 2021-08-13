import { Metadata } from "../../modules/didi-commons/lib/metadata/Metadata.ts";
import { PositionSupport } from "../../../deps.ts";
import { IInitDestroyMethodMetadata } from "./IInitDestroyMethodMetadata.ts";

export class InitDestroyMethodDecorators {
    private readonly setter: Metadata<PositionSupport<IInitDestroyMethodMetadata>>;

    constructor(readonly metadataKey: string) {
        this.setter = new Metadata(metadataKey, () => new PositionSupport());
    }

    public decorator(positioning?: (position: PositionSupport<IInitDestroyMethodMetadata>) => void) {
        return (prototype: any, name: string) => {
            const current = this.setter.ownMetadata(prototype).elem({id: name});
            if (positioning !== undefined) {
                positioning(current);
            }
        }
    }

    public all(ctr: any): IterableIterator<string> {
        const positioning = this.setter.prototypeMetadata(
            ctr.prototype,
            PositionSupport.concatReducer,
            new PositionSupport()
        );
        return positioning.sort().map((md: IInitDestroyMethodMetadata) => md.id)[Symbol.iterator]();
    }
}
