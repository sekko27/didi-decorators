import { BeanType } from "../../didi-commons/BeanType.ts";
import { IDeSer } from "../definition/IDeSer.ts";
import { IDeSerBuilderContext } from "./IDeSerBuilderContext.ts";
import { ClassDeSerDefinition } from "../definition/ClassDeSerDefinition.ts";
import { ArrayDeSerDefinition } from "../definition/ArrayDeSerDefinition.ts";
import { AutoDeSerDefinition } from "../definition/AutoDeSerDefinition.ts";
import { OptionalDeSerDefinition } from "../definition/OptionalDeSerDefinition.ts";
import { PrimitiveDeSerDefinition } from "../definition/PrimitiveDeSerDefinition.ts";
import { TransientDeSerDefinition } from "../definition/TransientDeSerDefinition.ts";

export interface IDeSerBuilder {
    Class(definition: ClassDeSerDefinition<any>, context: IDeSerBuilderContext): IDeSer;
    Array(definition: ArrayDeSerDefinition, context: IDeSerBuilderContext ): IDeSer;
    Auto(definition: AutoDeSerDefinition, context: IDeSerBuilderContext): IDeSer;
    Optional(definition: OptionalDeSerDefinition, context: IDeSerBuilderContext): IDeSer;
    Primitive(definition: PrimitiveDeSerDefinition, context: IDeSerBuilderContext): IDeSer;
    Transient(definition: TransientDeSerDefinition, context: IDeSerBuilderContext): IDeSer;
}
