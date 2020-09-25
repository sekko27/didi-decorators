import { IBeanResolver } from "../../IBeanResolver.ts";
import { IParamListResolver } from "../../../param/interfaces/IParamListResolver.ts";
import { IBeanDefinition } from "../IBeanDefinition.ts";
import { BeanType } from "../../../../didi-commons/BeanType.ts";

export interface IBeanDefinitionFactory<T> {
    readonly type: BeanType<T>;
    readonly tags: Map<string, any>;
    readonly optional: boolean;

    create(beanResolver: IBeanResolver, paramListResolver: IParamListResolver): IBeanDefinition<T>;
}
