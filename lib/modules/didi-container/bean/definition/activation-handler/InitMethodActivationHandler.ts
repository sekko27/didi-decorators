import { IActivationHandler } from "./IActivationHandler.ts";
import { IBeanResolverContext, IFactoryResolverContext } from "../builder/interfaces/IBeanResolverForFactory.ts";
import { InitMethodDecorators } from "../../../../../decorators/init-destroy-method/InitMethodDecorators.ts";
import { ParamDecorators } from "../../../../../decorators/param/ParamDecorators.ts";

export class InitMethodActivationHandler implements IActivationHandler {
    public static readonly ID: string = "InitMethod";
    readonly id: string = InitMethodActivationHandler.ID;

    async apply<T >(instance: T, resolverContext: IFactoryResolverContext<T>, beanResolverContext: IBeanResolverContext): Promise<T> {
        const ctr = (instance as any).constructor;
        for (const initMethod of InitMethodDecorators.all(ctr)) {
            const params = await resolverContext.paramList(ParamDecorators.methodParams(ctr, initMethod), beanResolverContext);
            await (instance as any)[initMethod](...params);
        }
        return instance;
    }

}
