import { IContainerConfiguration } from "./IContainerConfiguration.ts";
import { IParamListResolver } from "../param/interfaces/IParamListResolver.ts";
import { ParamListResolverChain } from "../param/ParamListResolverChain.ts";
import { BeanType } from "../../../../didi-commons/lib/types/BeanType.ts";
import { IBeanDefinitionBuilderAPI } from "../builder/api/IBeanDefinitionBuilderAPI.ts";
import { DefaultBeanDefinitionBuilderAPI } from "../builder/api/DefaultBeanDefinitionBuilderAPI.ts";
import { IBeanDefinitionBuilder } from "../builder/interfaces/IBeanDefinitionBuilder.ts";
import { IContainer } from "../../container/IContainer.ts";
import { ApplicationContainer } from "../../container/ApplicationContainer.ts";
import { ActivationHandlerChain } from "../activation-handler/ActivationHandlerChain.ts";
import { PostConfiguratorDecorators } from "../../../../../decorators/post-configurator/PostConfiguratorDecorators.ts";
import { IPostConfiguratorTarget } from "./post-configurator/IPostConfiguratorTarget.ts";
import { IQuery } from "../../../../didi-queries/interfaces/IQuery.ts";
import { NaiveMetaRepository } from "../../container/NaiveMetaRepository.ts";
import { IBeanDefinition } from "../IBeanDefinition.ts";
import { IMetaRepository } from "../../container/IMetaRepository.ts";

export class ContainerConfiguration implements IContainerConfiguration {
    private readonly builders: IMetaRepository<IBeanDefinitionBuilder<any>> = new NaiveMetaRepository();
    public readonly activationHandler: ActivationHandlerChain = ActivationHandlerChain.default();

    constructor(
        private readonly paramListResolver: IParamListResolver = ParamListResolverChain.getDefault(),
    ) {
    }

    register<T>(type: BeanType<T>): IBeanDefinitionBuilderAPI<T> {
        return new DefaultBeanDefinitionBuilderAPI(
            type,
            this.paramListResolver,
            (builder: IBeanDefinitionBuilder<any>) => this.builders.set(builder),
        )
    }

    async buildContainer(): Promise<IContainer> {
        const postConfiguratorDefinedBuilders: IMetaRepository<IBeanDefinitionBuilder<any>> = new NaiveMetaRepository();

        const interfaceForPostConfigurators: IPostConfiguratorTarget = {
            filter: async <B>(query: IQuery<B>): Promise<IBeanDefinitionBuilder<B>[]> => {
                const configurationBuilders = await this.builders.get(query);
                const postConfigurationBuilders = await postConfiguratorDefinedBuilders.get(query);
                return [...configurationBuilders, ...postConfigurationBuilders];
            },

            register: <T>(type: BeanType<T>): IBeanDefinitionBuilderAPI<T> => {
                return new DefaultBeanDefinitionBuilderAPI(
                    type,
                    this.paramListResolver,
                    (builder: IBeanDefinitionBuilder<any>) => postConfiguratorDefinedBuilders.set(builder),
                );
            }
        };

        for (const postConfigurator of PostConfiguratorDecorators.getPostConfigurators(this.constructor)) {
            await postConfigurator.configurator.configure(interfaceForPostConfigurators);
        }

        const beanDefinitions: IMetaRepository<IBeanDefinition<any>> = new NaiveMetaRepository<IBeanDefinition<any>>();
        // TODO Make common iteratorIterator
        for (const builder of this.builders) {
            beanDefinitions.set(builder.build());
        }
        for (const builder of postConfiguratorDefinedBuilders) {
            beanDefinitions.set(builder.build());
        }

        return new ApplicationContainer(beanDefinitions, this.paramListResolver, this.activationHandler);
    }
}
