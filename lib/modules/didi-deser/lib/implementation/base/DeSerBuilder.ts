import { IDeSerBuilder } from "../../interfaces/IDeSerBuilder.ts";
import { IConditionalDeSerBuilder } from "../../interfaces/IConditionalDeSerBuilder.ts";
import { IDeSer } from "../../interfaces/IDeSer.ts";
import { IDeSerDecoratorMetadata } from "../../interfaces/IDeSerDecoratorMetadata.ts";
import { NoMatchingDeSerBuilderError } from "../../errors/NoMatchingDeSerBuilderError.ts";
import { IDeSerBuilderContext } from "../../interfaces/IDeSerBuilderContext.ts";
import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";

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
