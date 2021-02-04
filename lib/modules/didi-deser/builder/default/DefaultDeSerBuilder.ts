import { IDeSerBuilder } from "../IDeSerBuilder.ts";
import { ClassDeSerDefinition } from "../../definition/ClassDeSerDefinition.ts";
import { IDeSerBuilderContext } from "../IDeSerBuilderContext.ts";
import { IDeSer } from "../../definition/IDeSer.ts";
import { DefaultClassDeSer, IDefaultClassFieldDeSerDescriptor } from "./DefaultClassDeSer.ts";
import { ArrayDeSerDefinition } from "../../definition/ArrayDeSerDefinition.ts";
import { DefaultArrayDeSer } from "./DefaultArrayDeSer.ts";
import { AutoDeSerDefinition } from "../../definition/AutoDeSerDefinition.ts";
import { DefaultAutoDeSer } from "./DefaultAutoDeSer.ts";
import { OptionalDeSerDefinition } from "../../definition/OptionalDeSerDefinition.ts";
import { DefaultOptionalDeSer } from "./DefaultOptionalDeSer.ts";
import { PrimitiveDeSerDefinition } from "../../definition/PrimitiveDeSerDefinition.ts";
import { DefaultPrimitiveDeSer } from "./DefaultPrimitiveDeSer.ts";
import { TransientDeSerDefinition } from "../../definition/TransientDeSerDefinition.ts";
import { DefaultTransientDeSer } from "./DefaultTransientDeSer.ts";

export class DefaultDeSerBuilder implements IDeSerBuilder {
    Class(definition: ClassDeSerDefinition<any>, context: IDeSerBuilderContext): IDeSer {
        const fieldDescriptors: IDefaultClassFieldDeSerDescriptor[] = context.metadata(definition.type)
            .map(md => ({
                alias: md.options.alias ?? md.name,
                name: md.name,
                deser: md.definition.build(this, context)
            }));
        return new DefaultClassDeSer(definition.type, fieldDescriptors);
    }

    Array(definition: ArrayDeSerDefinition, context: IDeSerBuilderContext): IDeSer {
        return new DefaultArrayDeSer(definition.elementDefinition.build(this, context));
    }

    Auto(definition: AutoDeSerDefinition, context: IDeSerBuilderContext): IDeSer {
        return new DefaultAutoDeSer(definition.valueDefinition.build(this, context));
    }

    Optional(definition: OptionalDeSerDefinition, context: IDeSerBuilderContext): IDeSer {
        return new DefaultOptionalDeSer(definition.valueDefinition.build(this, context));
    }

    Primitive(definition: PrimitiveDeSerDefinition, context: IDeSerBuilderContext): IDeSer {
        return new DefaultPrimitiveDeSer(definition.type);
    }

    Transient(definition: TransientDeSerDefinition, context: IDeSerBuilderContext): IDeSer {
        return new DefaultTransientDeSer();
    }




}
