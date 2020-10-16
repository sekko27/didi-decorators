import { IFactoryResolverContext } from "../builder/interfaces/IBeanResolver.ts";
import { IEntity } from "../../../../didi-commons/IEntity.ts";

export interface IActivationHandler extends IEntity {
    apply<T extends ObjectConstructor>(instance: T, resolverContext: IFactoryResolverContext): Promise<T>;
}
