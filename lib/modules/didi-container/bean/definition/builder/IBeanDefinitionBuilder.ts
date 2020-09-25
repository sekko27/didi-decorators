import { IBeanDefinition } from "../IBeanDefinition.ts";
import { IScope } from "../../scope/IScope.ts";
import { Name } from "../../../../didi-commons/Name.ts";
import { IBeanDefinitionFactory } from "../factory/IBeanDefinitionFactory.ts";

export interface IBeanDefinitionBuilder<T, D extends IBeanDefinition<T>> {
    build(): IBeanDefinitionFactory<T>;
    singleton(): this;
    prototype(): this;
    tag(tag: Name, value: any): this;
}
