import { IDeSer } from "./IDeSer.ts";
import { EmbeddedDeSerDefinition } from "../implementation/embedded/EmbeddedDeSerDefinition.ts";
import { ArrayDeSerDefinition } from "../implementation/array/ArrayDeSerDefinition.ts";
import { AutoDeSerDefinition } from "../implementation/auto/AutoDeSerDefinition.ts";
import { OptionalDeSerDefinition } from "../implementation/optional/OptionalDeSerDefinition.ts";
import { PrimitiveDeSerDefinition } from "../implementation/primitive/PrimitiveDeSerDefinition.ts";
import { TransientDeSerDefinition } from "../implementation/transient/TransientDeSerDefinition.ts";
import { MixedDeSerDefinition } from "../implementation/mixed/MixedDeSerDefinition.ts";
import { IDeSerDefinition } from "./IDeSerDefinition.ts";
import { IDeSerDecoratorMetadata } from "./IDeSerDecoratorMetadata.ts";
import { IDeSerBuilderContext } from "./IDeSerBuilderContext.ts";

/*
export interface IDeSerBuilder {
    Embedded(definition: EmbeddedDeSerDefinition): IDeSer;
    Mixed(definition: MixedDeSerDefinition): IDeSer;
    Array(definition: ArrayDeSerDefinition): IDeSer;
    Auto(definition: AutoDeSerDefinition): IDeSer;
    Optional(definition: OptionalDeSerDefinition): IDeSer;
    Primitive(definition: PrimitiveDeSerDefinition): IDeSer;
    Transient(definition: TransientDeSerDefinition): IDeSer;
}
*/

export interface IDeSerBuilder {
    build(definition: IDeSerDefinition, context?: IDeSerBuilderContext): IDeSer;
}
