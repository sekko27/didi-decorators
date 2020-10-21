import { IActivationHandler } from "./IActivationHandler.ts";
import { IBeanResolverContext, IFactoryResolverContext } from "../builder/interfaces/IBeanResolverForFactory.ts";
import { InitMethodDecorators } from "../../../../../decorators/init-destroy-method/InitMethodDecorators.ts";
import { ParamDecorators } from "../../../../../decorators/param/ParamDecorators.ts";

export class InitMethodActivationHandler implements IActivationHandler {
    public static readonly ID: string = "InitMethod";
    readonly id: string = InitMethodActivationHandler.ID;

    async apply<T >(instance: T, resolverContext: IFactoryResolverContext<T>, beanResolverContext: IBeanResolverContext): Promise<T> {
        const prototype = (instance as any).constructor.prototype;
        for (const initMethod of InitMethodDecorators.all(prototype)) {
            const params = await resolverContext.paramList(ParamDecorators.methodParams(prototype, initMethod), beanResolverContext);
            await (instance as any)[initMethod](...params);
        }
        return instance;
    }

}
