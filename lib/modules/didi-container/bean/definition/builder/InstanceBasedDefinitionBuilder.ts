import { BaseBeanDefinitionBuilder } from "./BaseBeanDefinitionBuilder.ts";
import { IBeanDefinition } from "../IBeanDefinition.ts";
import { BeanType } from "../../../../didi-commons/BeanType.ts";
import { InstanceOf } from "../../factory/InstanceOf.ts";
import { IQuery } from "../../../../didi-queries/interfaces/IQuery.ts";
import { Query } from "../../../../didi-queries/Query.ts";
import { ITagsQuery } from "../../../../didi-queries/interfaces/ITagsQuery.ts";
import { TagsQuery } from "../../../../didi-queries/TagsQuery.ts";

export interface IInstanceBasedDefinition<T> extends IBeanDefinition<T> {
    readonly params: Map<string, any>;
    readonly qualifiers: Map<string, IQuery<any>>;
}

export abstract class InstanceBasedDefinitionBuilder<T, CBD extends IInstanceBasedDefinition<T> = IInstanceBasedDefinition<T>>
    extends BaseBeanDefinitionBuilder<T, CBD> {

    private readonly params: Map<string, any> = new Map();
    private readonly paramQualifiers: Map<string, IQuery<any>> = new Map();

    protected constructor(type: BeanType<T>) {
        super(type, new InstanceOf(type));
    }

    protected buildInstanceBased() {
        return {
            params: this.params,
            qualifiers: this.paramQualifiers,
        };
    }

    protected defineParamValue(param: string, value: any): this {
        this.params.set(param, value);
        return this;
    }

    protected qualifyParam(param: string, type: BeanType<any> | undefined, query: ITagsQuery = TagsQuery.EMPTY): this {
        const currentQualifier: IQuery<any> | undefined = this.paramQualifiers.get(param);
        if (currentQualifier === undefined) {
            this.paramQualifiers.set(param, new Query(type, query));
        } else {
            let modified: IQuery<any> = currentQualifier;
            if (type !== undefined) {
                modified = currentQualifier.concretiseType(type);
            }
            modified = modified.mergeTagsOnly(query);
            this.paramQualifiers.set(param, modified);
        }
        return this;
    }

    protected qualifyParamType(param: string, type: BeanType<any>): this {
        return this.qualifyParam(param, type);
    }

    protected qualifyParamQuery(param: string, query: ITagsQuery): this {
        return this.qualifyParam(param, undefined, query);
    }


}

