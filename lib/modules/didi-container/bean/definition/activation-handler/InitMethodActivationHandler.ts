import { IActivationHandler } from "./IActivationHandler.ts";
import { IFactoryResolverContext } from "../builder/interfaces/IBeanResolver.ts";
import { InitMethodDecorators } from "../../../../../decorators/init-destroy-method/InitMethodDecorators.ts";
import { ParamDecorators } from "../../../../../decorators/param/ParamDecorators.ts";

export class InitMethodActivationHandler implements IActivationHandler {
    public static readonly ID: string = "InitMethod";
    readonly id: string = InitMethodActivationHandler.ID;

    async apply<T extends ObjectConstructor>(instance: T, resolverContext: IFactoryResolverContext): Promise<T> {
        const constructor = instance.constructor;
        for (const initMethod of InitMethodDecorators.all(constructor)) {
            const params = await resolverContext.paramList(ParamDecorators.methodParams(constructor, initMethod));
            await (instance as any)[initMethod](...params);
        }
        return instance;
    }

}
