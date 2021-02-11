import { IConditionalDeSerBuilder } from "../../interfaces/IConditionalDeSerBuilder.ts";
import { ArrayDeSerDefinition } from "../array/ArrayDeSerDefinition.ts";
import { IDeSerBuilderContext } from "../../interfaces/IDeSerBuilderContext.ts";
import { IDeSer } from "../../interfaces/IDeSer.ts";
import { ArrayDeSer } from "../array/ArrayDeSer.ts";
import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";
import { EmbeddedDeSerDefinition } from "./EmbeddedDeSerDefinition.ts";
import { DefinitionBasedConditionalDeSerBuilder } from "../base/DefinitionBasedConditionalDeSerBuilder.ts";
import { InMemoryCache } from "../../../../didi-cache/InMemoryCache.ts";
import { BeanType } from "../../../../didi-commons/lib/types/BeanType.ts";
import { EmbeddedDeSer, IDefaultClassFieldDeSerDescriptor } from "./EmbeddedDeSer.ts";
import { DeSerDecorators } from "../base/DeSerDecorators.ts";

export class EmbeddedDeSerBuilder extends DefinitionBasedConditionalDeSerBuilder<EmbeddedDeSerDefinition> implements IConditionalDeSerBuilder {
    private readonly classCache: InMemoryCache<BeanType<any>, EmbeddedDeSer, [IDeSerBuilderContext]>;

    constructor() {
        super(EmbeddedDeSerDefinition);
        this.classCache = new InMemoryCache((cls, ctx: IDeSerBuilderContext) => this.classCacheProvider(cls, ctx));
    }


    build(definition: EmbeddedDeSerDefinition, ctx: IDeSerBuilderContext): IDeSer {
        return this.classCache.get(definition.type, ctx);
    }

    private classCacheProvider(cls: BeanType<any>, ctx: IDeSerBuilderContext) {
        const fieldDescriptors: IDefaultClassFieldDeSerDescriptor[] = DeSerDecorators.all(cls)
            .map(md => ({
                alias: md.options.alias ?? md.name,
                name: md.name,
                deser: ctx.manager.build(md.definition, {
                    manager: ctx.manager,
                    path: ctx.path.concat([md.name])
                })
            }));
        console.log(cls.name, fieldDescriptors);
        return new EmbeddedDeSer(cls, fieldDescriptors);
    }

}
