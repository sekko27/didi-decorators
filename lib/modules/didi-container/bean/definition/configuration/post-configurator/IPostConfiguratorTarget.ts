import { BeanType } from "../../../../../didi-commons/BeanType.ts";
import { IBeanDefinitionBuilderAPI } from "../../builder/api/IBeanDefinitionBuilderAPI.ts";
import { IQuery } from "../../../../../didi-queries/interfaces/IQuery.ts";
import { IBeanDefinitionBuilder } from "../../builder/interfaces/IBeanDefinitionBuilder.ts";

export interface IPostConfiguratorTarget {
    register<T>(type: BeanType<T>): IBeanDefinitionBuilderAPI<T>;
    filter<B>(query: IQuery<B>): Promise<IBeanDefinitionBuilder<B>[]>;
}
