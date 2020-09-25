import { InstanceBasedDefinitionBuilder } from "./InstanceBasedDefinitionBuilder.ts";
import { IInstanceBasedDefinition } from "./InstanceBasedDefinitionBuilder.ts";
import { IBeanDefinitionBuilder } from "./IBeanDefinitionBuilder.ts";
import { BeanType } from "../../../../didi-commons/BeanType.ts";
import { ITagsQuery } from "../../../../didi-queries/interfaces/ITagsQuery.ts";
import { TagsQuery } from "../../../../didi-queries/TagsQuery.ts";
import { BeanFactoryClass } from "../../factory/BeanFactoryClass.ts";
import { IQuery } from "../../../../didi-queries/interfaces/IQuery.ts";
import { Query } from "../../../../didi-queries/Query.ts";

export interface IFactoryOfBeanDefinition<T, K extends string, F extends BeanFactoryClass<K, T>> extends IInstanceBasedDefinition<T> {
    readonly factoryBeanType: BeanType<F>;
    readonly method: K;
    readonly factoryBeanQualifier: IQuery<F>;
}

export class FactoryBeanDefinitionBuilder<T, K extends string, F extends BeanFactoryClass<K, T>>
    extends InstanceBasedDefinitionBuilder<T, IFactoryOfBeanDefinition<T, K, F>>
    implements IBeanDefinitionBuilder<T, IFactoryOfBeanDefinition<T, K, F>> {

    private factoryBeanQualifier: IQuery<F> = new Query(undefined);

    constructor(type: BeanType<T>, private readonly factoryBeanType: BeanType<F>, private readonly method: K) {
        super(type);
    }

    protected buildCustom() {
        return {
            ...super.buildInstanceBased(),
            factoryBeanType: this.factoryBeanType,
            method: this.method,
            factoryBeanQualifier: this.factoryBeanQualifier
        };
    }

    defineFactoryMethodParamValue(param: string, value: any): this {
        this.defineParamValue(param, value);
        return this;
    }

    qualifyFactoryMethodParamType(param: string, type: BeanType<any>): this {
        this.qualifyParamType(param, type);
        return this;
    }

    qualifyFactoryMethodParamQuery(param: string, query: ITagsQuery): this {
        this.qualifyParamQuery(param, query);
        return this;
    }

    qualifyFactoryMethodParam(param: string, type: BeanType<any> | undefined, query: ITagsQuery = TagsQuery.EMPTY): this {
        this.qualifyParam(param, type, query);
        return this;
    }

    qualifyFactoryBeanResolution<O extends F>(query: IQuery<F>): this {
        this.factoryBeanQualifier = this.factoryBeanQualifier.merge(query);
        return this;
    }
}
/*

class AF {}
class BF extends AF {}

@EnablePina({
    concretise: {
        [PinaModule.FACTORY_NAME]: {
            query: new TagsQuery()
        }
    }
})
class AppConfiguration extends Configuration {

}

.register<AF>(AF)
*/
