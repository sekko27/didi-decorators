import { IScope } from "./IScope.ts";
import { IBeanResolverContext, IFactoryResolverContext } from "../builder/interfaces/IBeanResolverForFactory.ts";

export class Singleton<T> implements IScope<T>{
    private instance: Promise<T> | undefined = undefined;

    async get(factoryResolverContext: IFactoryResolverContext<T>, beanResolverContext: IBeanResolverContext): Promise<T> {
        if (this.instance === undefined) {
            this.instance = factoryResolverContext.createNewInstance(beanResolverContext);
        }
        return this.instance;
    }

}
