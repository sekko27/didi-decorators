import { IBeanDefinition } from "../IBeanDefinition.ts";
import { IScope } from "../../scope/IScope.ts";
import { Name } from "../../../../didi-commons/Name.ts";
import { Tags } from "../../../../didi-tags/types/Tags.ts";
import { BeanDefinitionQuery } from "../../BeanDefinitionQuery.ts";

export interface IBeanDefinitionBuilder<T> {
    build(): IBeanDefinition<T>;
    setScope(scope: IScope<T>): this;
    tag(tag: Name, value: any): this;
    param(name: string, value: any): this;
    qualify(name: string, query: BeanDefinitionQuery<any>): this;
}
