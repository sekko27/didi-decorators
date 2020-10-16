import { IScope } from "./IScope.ts";
import { IFactoryResolverContext } from "../builder/interfaces/IBeanResolver.ts";

export class Singleton<T> implements IScope<T>{
    private instance: Promise<T> | undefined = undefined;

    async get(factoryResolverContext: IFactoryResolverContext<T>): Promise<T> {
        if (this.instance === undefined) {
            this.instance = factoryResolverContext.createNewInstance();
        }
        return this.instance;
    }

}
