import { IDeSer } from "../definition/IDeSer.ts";
import { ClassDeSerDefinition } from "../definition/ClassDeSerDefinition.ts";
import { ArrayDeSerDefinition } from "../definition/ArrayDeSerDefinition.ts";
import { AutoDeSerDefinition } from "../definition/AutoDeSerDefinition.ts";
import { OptionalDeSerDefinition } from "../definition/OptionalDeSerDefinition.ts";
import { PrimitiveDeSerDefinition } from "../definition/PrimitiveDeSerDefinition.ts";
import { TransientDeSerDefinition } from "../definition/TransientDeSerDefinition.ts";
import { MixedDeSerDefinition } from "../definition/MixedDeSerDefinition.ts";
import { IDeSerDefinition } from "../definition/IDeSerDefinition.ts";
import { IDeSerDecoratorMetadata } from "../decorators/IDeSerDecoratorMetadata.ts";
import { IDeSerBuilderContext } from "./IDeSerBuilderContext.ts";

/*
export interface IDeSerBuilder {
    Class(definition: ClassDeSerDefinition): IDeSer;
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
