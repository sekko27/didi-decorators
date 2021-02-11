import { IBeanResolverContext, IFactoryResolverContext } from "../builder/interfaces/IBeanResolverForFactory.ts";
import { IEntity } from "../../../../didi-commons/lib/types/IEntity.ts";

export interface IActivationHandler extends IEntity {
    apply<T>(instance: T, resolverContext: IFactoryResolverContext<T>, beanResolverContext: IBeanResolverContext): Promise<T>;
}
