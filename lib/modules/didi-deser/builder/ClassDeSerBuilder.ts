import { IConditionalDeSerBuilder } from "./IConditionalDeSerBuilder.ts";
import { ArrayDeSerDefinition } from "../definition/ArrayDeSerDefinition.ts";
import { IDeSerBuilderContext } from "./IDeSerBuilderContext.ts";
import { IDeSer } from "../definition/IDeSer.ts";
import { ArrayDeSer } from "../deser/base/ArrayDeSer.ts";
import { IDeSerDefinition } from "../definition/IDeSerDefinition.ts";
import { ClassDeSerDefinition } from "../definition/ClassDeSerDefinition.ts";
import { DefinitionBasedConditionalDeSerBuilder } from "./DefinitionBasedConditionalDeSerBuilder.ts";
import { InMemoryCache } from "../../didi-cache/InMemoryCache.ts";
import { BeanType } from "../../didi-commons/BeanType.ts";
import { ClassDeSer, IDefaultClassFieldDeSerDescriptor } from "../deser/base/ClassDeSer.ts";
import { DeSerDecorators } from "../decorators/DeSerDecorators.ts";

export class ClassDeSerBuilder extends DefinitionBasedConditionalDeSerBuilder<ClassDeSerDefinition> implements IConditionalDeSerBuilder {
    private readonly classCache: InMemoryCache<BeanType<any>, ClassDeSer, [IDeSerBuilderContext]>;

    constructor() {
        super(ClassDeSerDefinition);
        this.classCache = new InMemoryCache((cls, ctx: IDeSerBuilderContext) => this.classCacheProvider(cls, ctx));
    }


    build(definition: ClassDeSerDefinition, ctx: IDeSerBuilderContext): IDeSer {
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
        return new ClassDeSer(cls, fieldDescriptors);
    }

}
