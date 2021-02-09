import { IDeSerDefinition } from "../definition/IDeSerDefinition.ts";
import { BeanType } from "../../didi-commons/BeanType.ts";
import { IDeSerBuilderContext } from "./IDeSerBuilderContext.ts";
import { IDeSer } from "../definition/IDeSer.ts";

export abstract class DefinitionBasedConditionalDeSerBuilder<T extends IDeSerDefinition> {
    protected constructor(private readonly definitionClass: BeanType<T>) {
    }

    public test(definition: IDeSerDefinition): boolean {
        return definition.constructor === this.definitionClass;
    }

    abstract build(definition: T, ctx: IDeSerBuilderContext): IDeSer;
}
