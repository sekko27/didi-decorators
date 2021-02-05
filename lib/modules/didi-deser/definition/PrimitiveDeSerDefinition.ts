import { PrimitiveType } from "../../didi-commons/TypeSupport.ts";
import { IDeSerDefinition } from "./IDeSerDefinition.ts";
import { IDeSerBuilder } from "../builder/IDeSerBuilder.ts";
import { IDeSerBuilderContext } from "../builder/IDeSerBuilderContext.ts";
import { IDeSer } from "./IDeSer.ts";
import { BeanType } from "../../didi-commons/BeanType.ts";

export class PrimitiveDeSerDefinition implements IDeSerDefinition {
    constructor(readonly type: BeanType<PrimitiveType>) {
    }

    build(specific: IDeSerBuilder, context: IDeSerBuilderContext): IDeSer {
        return specific.Primitive(this, context);
    }


}
