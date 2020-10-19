import { IBeanResolverContext } from "./IBeanResolverForFactory.ts";

export interface IBeanDefinitionResolver<T> {
    resolve(context: IBeanResolverContext): Promise<T>;
}
