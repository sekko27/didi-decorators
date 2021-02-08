import { IDeSerBuilder } from "../IDeSerBuilder.ts";
import { ClassDeSerDefinition } from "../../definition/ClassDeSerDefinition.ts";
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
import { InMemoryCache } from "../../../didi-cache/InMemoryCache.ts";
import { BeanType } from "../../../didi-commons/BeanType.ts";
import { DeSerDecorators } from "../../decorators/DeSerDecorators.ts";
import { MixedDeSerDefinition } from "../../definition/MixedDeSerDefinition.ts";
import { DefaultMixedDeSer } from "./DefaultMixedDeSer.ts";

export class DefaultDeSerBuilder implements IDeSerBuilder {
    private readonly classCache: InMemoryCache<BeanType<any>, DefaultClassDeSer>;

    constructor() {
        this.classCache = new InMemoryCache((cls: BeanType<any>) => this.classCacheProvider(cls));
    }

    private classCacheProvider(cls: BeanType<any>) {
        const fieldDescriptors: IDefaultClassFieldDeSerDescriptor[] = DeSerDecorators.all(cls)
            .map(md => ({
                alias: md.options.alias ?? md.name,
                name: md.name,
                deser: md.definition.build(this)
            }));
        return new DefaultClassDeSer(cls, fieldDescriptors);
    }

    Class(definition: ClassDeSerDefinition): IDeSer {
        return this.classCache.get(definition.type);
    }

    Mixed(definition: MixedDeSerDefinition): IDeSer {
        return new DefaultMixedDeSer();
    }

    Array(definition: ArrayDeSerDefinition): IDeSer {
        return new DefaultArrayDeSer(definition.elementDefinition.build(this));
    }

    Auto(definition: AutoDeSerDefinition): IDeSer {
        return new DefaultAutoDeSer(definition.valueDefinition.build(this));
    }

    Optional(definition: OptionalDeSerDefinition): IDeSer {
        return new DefaultOptionalDeSer(definition.valueDefinition.build(this));
    }

    Primitive(definition: PrimitiveDeSerDefinition): IDeSer {
        return new DefaultPrimitiveDeSer(definition.type);
    }

    Transient(definition: TransientDeSerDefinition): IDeSer {
        return new DefaultTransientDeSer();
    }
}
