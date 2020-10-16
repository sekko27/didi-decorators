import { IContainerConfiguration } from "./IContainerConfiguration.ts";
import { IParamListResolver } from "../param/interfaces/IParamListResolver.ts";
import { ParamListResolverChain } from "../param/ParamListResolverChain.ts";
import { BeanType } from "../../../../didi-commons/BeanType.ts";
import { IBeanDefinitionBuilderAPI } from "../builder/api/IBeanDefinitionBuilderAPI.ts";
import { DefaultBeanDefinitionBuilderAPI } from "../builder/api/DefaultBeanDefinitionBuilderAPI.ts";
import { IBeanDefinitionBuilder } from "../builder/interfaces/IBeanDefinitionBuilder.ts";
import { IContainer } from "../../container/IContainer.ts";
import { ApplicationContainer } from "../../container/ApplicationContainer.ts";
import { IBeanDefinitionRepository } from "../../container/IBeanDefinitionRepository.ts";
import { NaiveBeanDefinitionRepository } from "../../container/NaiveBeanDefinitionRepository.ts";
import { ActivationHandlerChain } from "../activation-handler/ActivationHandlerChain.ts";

export class ContainerConfiguration implements IContainerConfiguration {
    private readonly builders: IBeanDefinitionBuilder<any>[] = [];
    public readonly activationHandler: ActivationHandlerChain = ActivationHandlerChain.default();

    constructor(
        private readonly paramListResolver: IParamListResolver = ParamListResolverChain.getDefault(),
    ) {
    }

    register<T>(type: BeanType<T>): IBeanDefinitionBuilderAPI<T> {
        return new DefaultBeanDefinitionBuilderAPI(
            type,
            this.paramListResolver,
            (builder: IBeanDefinitionBuilder<any>) => this.builders.push(builder),
        )
    }

    buildContainer(): IContainer {
        const beanDefinitions: IBeanDefinitionRepository = new NaiveBeanDefinitionRepository();
        this.builders.forEach(builder => {
            beanDefinitions.set(builder.build());
        });
        return new ApplicationContainer(beanDefinitions, this.paramListResolver, this.activationHandler);
    }



}
