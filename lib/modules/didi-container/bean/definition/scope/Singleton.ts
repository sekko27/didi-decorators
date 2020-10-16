import { IScope } from "./IScope.ts";
import { IFactoryResolverContext } from "../builder/interfaces/IBeanResolver.ts";
import { IBeanFactory } from "../builder/interfaces/IBeanFactory.ts";

export class Singleton<T> implements IScope<T>{
    private instance: Promise<T> | undefined = undefined;

    async get(factory: IBeanFactory<T>, factoryResolverContext: IFactoryResolverContext): Promise<T> {
        if (this.instance === undefined) {
            this.instance = factoryResolverContext.createNewInstance(factory);
        }
        return this.instance;
    }

}
