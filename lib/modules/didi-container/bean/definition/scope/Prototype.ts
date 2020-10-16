import { IScope } from "./IScope.ts";
import {  IFactoryResolverContext } from "../builder/interfaces/IBeanResolver.ts";

export class Prototype<T> implements IScope<T> {
    async get(factoryResolverContext: IFactoryResolverContext<T>): Promise<T> {
        return factoryResolverContext.createNewInstance();
    }
}
