import { IScope } from "../../scope/IScope.ts";
import { IFactoryResolverContext } from "../interfaces/IBeanResolver.ts";
import { IBeanFactory } from "../interfaces/IBeanFactory.ts";
import { IBeanDefinitionResolver } from "../interfaces/IBeanDefinitionResolver.ts";

export class ParameterizedBeanDefinitionResolver<T> implements IBeanDefinitionResolver<T> {
    constructor(
        readonly scope: IScope<T>,
        private readonly factoryResolverContext: IFactoryResolverContext,
        private readonly factory: IBeanFactory<T>
    ) {
    }

    resolve(): Promise<T> {
        return this.scope.get(this.factory, this.factoryResolverContext);
    }
}
