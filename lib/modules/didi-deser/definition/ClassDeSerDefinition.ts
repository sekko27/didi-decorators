import { BeanType } from "../../didi-commons/BeanType.ts";
import { IDeSerDefinition } from "./IDeSerDefinition.ts";
import { IDeSerBuilder } from "../builder/IDeSerBuilder.ts";
import { IDeSer } from "./IDeSer.ts";

export class ClassDeSerDefinition implements IDeSerDefinition {
    constructor( readonly type: BeanType<any> ) {
    }
}
