import { IDeSerBuilder } from "./IDeSerBuilder.ts";
import { IConditionalDeSerBuilder } from "./IConditionalDeSerBuilder.ts";
import { IDeSer } from "../definition/IDeSer.ts";
import { IDeSerDecoratorMetadata } from "../decorators/IDeSerDecoratorMetadata.ts";
import { NoMatchingDeSerBuilderError } from "../errors/NoMatchingDeSerBuilderError.ts";
import { IDeSerBuilderContext } from "./IDeSerBuilderContext.ts";
import { IDeSerDefinition } from "../definition/IDeSerDefinition.ts";

export class DeSerBuilder implements IDeSerBuilder {
    constructor(private readonly builders: IConditionalDeSerBuilder[]) {
    }

    build(definition: IDeSerDefinition, context: IDeSerBuilderContext = {manager: this, path: []}): IDeSer {
        for (const builder of this.builders) {
            if (builder.test(definition)) {
                return builder.build(definition, context);
            }
        }
        // TODO Pass metadata to error
        throw new NoMatchingDeSerBuilderError();
    }
}
