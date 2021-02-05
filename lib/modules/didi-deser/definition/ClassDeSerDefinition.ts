import { BeanType } from "../../didi-commons/BeanType.ts";
import { IDeSerDefinition } from "./IDeSerDefinition.ts";
import { IDeSerBuilder } from "../builder/IDeSerBuilder.ts";
import { IDeSerBuilderContext } from "../builder/IDeSerBuilderContext.ts";
import { IDeSer } from "./IDeSer.ts";

export class ClassDeSerDefinition implements IDeSerDefinition {
    constructor( readonly type: BeanType<any> ) {
    }

    build(specific: IDeSerBuilder, context: IDeSerBuilderContext): IDeSer {
        return specific.Class(this, context);
    }


}
