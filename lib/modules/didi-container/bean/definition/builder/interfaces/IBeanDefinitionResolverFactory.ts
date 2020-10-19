import { IBeanDefinitionResolver } from "./IBeanDefinitionResolver.ts";
import { IBeanResolverForFactory } from "./IBeanResolverForFactory.ts";

export type IBeanDefinitionResolverFactory<T> = (beanResolver: IBeanResolverForFactory) => IBeanDefinitionResolver<T>;
