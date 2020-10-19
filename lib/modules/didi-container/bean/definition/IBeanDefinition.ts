import { IBeanResolverForFactory } from "./builder/interfaces/IBeanResolverForFactory.ts";
import { IParamListResolver } from "./param/interfaces/IParamListResolver.ts";
import { IBeanDefinitionMeta } from "./IBeanDefinitionMeta.ts";
import { IBeanDefinitionResolver } from "./builder/interfaces/IBeanDefinitionResolver.ts";

export interface IBeanDefinition<T> {
    meta: IBeanDefinitionMeta<T>;
    resolverFactory: (beanResolver: IBeanResolverForFactory, paramListResolver: IParamListResolver) => IBeanDefinitionResolver<T>;
}

