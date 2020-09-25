import { IBeanDefinitionResolver } from "./IBeanDefinitionResolver.ts";
import { IBeanDefinition } from "./definition/IBeanDefinition.ts";
import { IBeanResolver } from "./IBeanResolver.ts";
import { IParamListResolver } from "../param/interfaces/IParamListResolver.ts";
import { IParamListResolverContext } from "../param/interfaces/IParamListResolverContext.ts";

export class BeanDefinitionResolver<T> implements IBeanDefinitionResolver<T> {
    private readonly paramListResolverContext: IParamListResolverContext;

    constructor(
        private readonly definition: IBeanDefinition<T>,
        private readonly beanResolver: IBeanResolver,
        private readonly paramListResolver: IParamListResolver
    ) {
        this.paramListResolverContext = {
            beanResolver,
            qualifiers
        }
    }
}
