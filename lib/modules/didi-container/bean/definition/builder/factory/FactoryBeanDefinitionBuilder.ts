import { IBeanDefinitionBuilder } from "../interfaces/IBeanDefinitionBuilder.ts";
import { BeanType } from "../../../../../didi-commons/BeanType.ts";
import { ParameterizedBeanDefinitionBuilder } from "../base/ParameterizedBeanDefinitionBuilder.ts";
import { IBeanFactory } from "../interfaces/IBeanFactory.ts";
import { IParamListResolver } from "../../param/interfaces/IParamListResolver.ts";
import { Factory } from "./Factory.ts";
import { BeanFactoryClass } from "../interfaces/BeanFactoryClass.ts";
import { IQuery } from "../../../../../didi-queries/interfaces/IQuery.ts";
import { Query } from "../../../../../didi-queries/Query.ts";
import { ITagsQuery } from "../../../../../didi-queries/interfaces/ITagsQuery.ts";

export class FactoryBeanDefinitionBuilder<T, K extends string, F extends BeanFactoryClass<K, T>>
    extends ParameterizedBeanDefinitionBuilder<T>
    implements IBeanDefinitionBuilder<T> {

    private factoryBeanQualifier: IQuery<F>;

    constructor(
        type: BeanType<T>,
        paramListResolver: IParamListResolver,
        private readonly factoryBeanType: BeanType<F>,
        private readonly method: K,
    ) {
        super(type, paramListResolver);
        this.factoryBeanQualifier = new Query(factoryBeanType);
    }

    public qualifyFactory(tags: ITagsQuery): this {
        this.factoryBeanQualifier = this.factoryBeanQualifier.mergeTagsOnly(tags);
        return this;
    }

    protected createFactory(): IBeanFactory<T> {
        return new Factory(this.type, this.factoryBeanQualifier, this.method);
    }


}
