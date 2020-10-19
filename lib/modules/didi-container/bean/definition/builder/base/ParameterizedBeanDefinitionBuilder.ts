import { Prototype } from "../../scope/Prototype.ts";
import { IScope } from "../../scope/IScope.ts";
import { Singleton } from "../../scope/Singleton.ts";
import { BaseBeanDefinitionBuilder } from "./BaseBeanDefinitionBuilder.ts";
import { BeanType } from "../../../../../didi-commons/BeanType.ts";
import { IQuery } from "../../../../../didi-queries/interfaces/IQuery.ts";
import { Query } from "../../../../../didi-queries/Query.ts";
import { ITagsQuery } from "../../../../../didi-queries/interfaces/ITagsQuery.ts";
import { IBeanDefinitionResolverFactory } from "../interfaces/IBeanDefinitionResolverFactory.ts";
import { FactoryResolverContext, IBeanResolverForFactory } from "../interfaces/IBeanResolverForFactory.ts";
import { IBeanFactory } from "../interfaces/IBeanFactory.ts";
import { IParamListResolver } from "../../param/interfaces/IParamListResolver.ts";

export abstract class ParameterizedBeanDefinitionBuilder<T> extends BaseBeanDefinitionBuilder<T> {
    private readonly paramValues: Map<string, any> = new Map();
    private readonly paramQualifiers: Map<string, IQuery<any>> = new Map();

    protected constructor(
        type: BeanType<T>,
        private paramListResolver: IParamListResolver,
        private scope: IScope<T> = new Singleton()
    ) {
        super(type);
    }

    public prototype(): this {
        this.scope = new Prototype();
        return this;
    }

    public defineParamValue(paramName: string, paramValue: any): this {
        this.paramValues.set(paramName, paramValue);
        return this;
    }

    public qualifyParam(paramName: string, qualifier: IQuery<any>): this {
        if (this.paramQualifiers.has(paramName)) {
            const current = this.paramQualifiers.get(paramName) as IQuery<any>;
            this.paramQualifiers.set(paramName, current.merge(qualifier));
        } else {
            this.paramQualifiers.set(paramName, qualifier);
        }
        return this;
    }

    public qualifyParamType(paramName: string, type: BeanType<any>): this {
        return this.qualifyParam(paramName, new Query(type));
    }

    public qualifyParamTags(paramName: string, tags: ITagsQuery): this {
        return this.qualifyParam(paramName, new Query(undefined, tags));
    }


    protected resolverFactory(): IBeanDefinitionResolverFactory<T> {
        return (beanResolver: IBeanResolverForFactory) => new FactoryResolverContext(
            this.scope,
            this.createFactory(),
            beanResolver,
            this.paramListResolver,
            {
                qualifiers: this.paramQualifiers,
                values: this.paramValues,
            },
        );
    }

    protected abstract createFactory(): IBeanFactory<T>;
}
