import { PositionSupport } from "../../deps.ts";
import { IInitDestroyMethodMetadata } from "./IInitDestroyMethodMetadata.ts";
import { InitDestroyMethodDecorators } from "./InitDestroyMethodDecorators.ts";

export class DestroyMethodDecorators extends InitDestroyMethodDecorators {
    public static readonly METADATA_KEY: string = "metrix:decorators:destroy-method";
    private static readonly decorator: InitDestroyMethodDecorators
        = new InitDestroyMethodDecorators(DestroyMethodDecorators.METADATA_KEY);

    public static Destroy(positioning?: (position: PositionSupport<IInitDestroyMethodMetadata>) => void) {
        return this.decorator.decorator(positioning);
    }

    public static all(target: any): IterableIterator<string> {
        return this.decorator.all(target);
    }
}
