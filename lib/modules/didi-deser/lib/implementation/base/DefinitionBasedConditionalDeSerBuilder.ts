import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";
import { BeanType } from "../../../../didi-commons/BeanType.ts";
import { IDeSerBuilderContext } from "../../interfaces/IDeSerBuilderContext.ts";
import { IDeSer } from "../../interfaces/IDeSer.ts";

export abstract class DefinitionBasedConditionalDeSerBuilder<T extends IDeSerDefinition> {
    protected constructor(private readonly definitionClass: BeanType<T>) {
    }

    public test(definition: IDeSerDefinition): boolean {
        return definition.constructor === this.definitionClass;
    }

    abstract build(definition: T, ctx: IDeSerBuilderContext): IDeSer;
}
