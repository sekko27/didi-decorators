import { DeSerDecorators } from "../base/DeSerDecorators.ts";
import { IDeSerDecoratorMetadataOptions } from "../../interfaces/IDeSerDecoratorMetadata.ts";
import { MixedDeSerDefinition } from "./MixedDeSerDefinition.ts";

export function Mixed(options: IDeSerDecoratorMetadataOptions = {}) {
    return DeSerDecorators.register(() => new MixedDeSerDefinition(), options);
}
