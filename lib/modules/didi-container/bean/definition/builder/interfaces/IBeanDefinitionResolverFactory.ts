import { IBeanDefinitionResolver } from "./IBeanDefinitionResolver.ts";
import { IBeanResolver } from "./IBeanResolver.ts";

export type IBeanDefinitionResolverFactory<T> = (beanResolver: IBeanResolver) => IBeanDefinitionResolver<T>;
