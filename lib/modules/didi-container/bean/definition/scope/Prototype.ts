import { IScope } from "./IScope.ts";
import {  IFactoryResolverContext } from "../builder/interfaces/IBeanResolver.ts";
import { IBeanFactory } from "../builder/interfaces/IBeanFactory.ts";

export class Prototype<T> implements IScope<T> {
    async get(factory: IBeanFactory<T>, factoryResolverContext: IFactoryResolverContext): Promise<T> {
        return factoryResolverContext.createNewInstance(factory);
    }
}
