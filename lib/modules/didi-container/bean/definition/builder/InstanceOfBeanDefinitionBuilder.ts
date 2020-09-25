import { InstanceBasedDefinitionBuilder } from "./InstanceBasedDefinitionBuilder.ts";
import { IInstanceBasedDefinition } from "./InstanceBasedDefinitionBuilder.ts";
import { IBeanDefinitionBuilder } from "./IBeanDefinitionBuilder.ts";
import { BeanType } from "../../../../didi-commons/BeanType.ts";
import { ITagsQuery } from "../../../../didi-queries/interfaces/ITagsQuery.ts";
import { TagsQuery } from "../../../../didi-queries/TagsQuery.ts";

export class InstanceOfBeanDefinitionBuilder<T>
    extends InstanceBasedDefinitionBuilder<T>
    implements IBeanDefinitionBuilder<T, IInstanceBasedDefinition<T>> {

    public constructor(type: BeanType<T>) {
        super(type);
    }
    protected buildCustom() {
        return super.buildInstanceBased();
    }


    defineConstructorParamValue(param: string, value: any): this {
        this.defineParamValue(param, value);
        return this;
    }

    qualifyConstructorParamType(param: string, type: BeanType<any>): this {
        this.qualifyParamType(param, type);
        return this;
    }

    qualifyConstructorParamQuery(param: string, query: ITagsQuery): this {
        this.qualifyParamQuery(param, query);
        return this;
    }

    qualifyConstructorParam(param: string, type: BeanType<any> | undefined, query: ITagsQuery = TagsQuery.EMPTY): this {
        this.qualifyParam(param, type, query);
        return this;
    }
}
