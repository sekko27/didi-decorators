import { DeSerDecorators } from "../base/DeSerDecorators.ts";
import { IDeSerDecoratorMetadataOptions } from "../../interfaces/IDeSerDecoratorMetadata.ts";
import { EmbeddedDeSerDefinition } from "./EmbeddedDeSerDefinition.ts";
import { DecoratorSupport } from "../../../../didi-commons/metadata/DecoratorSupport.ts";
import { BeanType } from "../../../../didi-commons/BeanType.ts";

export function EmbeddedDef(type: BeanType<any>): EmbeddedDeSerDefinition {
    return new EmbeddedDeSerDefinition(type);
}

export function Embedded(options: IDeSerDecoratorMetadataOptions = {}) {
    return DeSerDecorators.register(
        (cls, field) => EmbeddedDef(DecoratorSupport.fieldType(cls, field)),
        options
    );
}
