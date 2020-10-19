import { BeanType } from "../../../../didi-commons/BeanType.ts";
import { IBeanDefinitionBuilderAPI } from "../builder/api/IBeanDefinitionBuilderAPI.ts";
import { IContainer } from "../../container/IContainer.ts";

export interface IContainerConfiguration {
    register<T>(type: BeanType<T>): IBeanDefinitionBuilderAPI<T>;
    buildContainer(): Promise<IContainer>;
}
