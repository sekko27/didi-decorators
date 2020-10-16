import { IActivationHandler } from "./IActivationHandler.ts";
import { IFactoryResolverContext } from "../builder/interfaces/IBeanResolver.ts";
import { SetterDecorators } from "../../../../../decorators/setter/SetterDecorators.ts";
import { ParamDecorators } from "../../../../../decorators/param/ParamDecorators.ts";

export class SetterInjectionActivationHandler implements IActivationHandler {
    public static readonly ID: string = "SetterInjection";
    readonly id: string = SetterInjectionActivationHandler.ID;

    async apply<T extends ObjectConstructor>(instance: T, resolverContext: IFactoryResolverContext): Promise<T> {
        const constructor = instance.constructor;
        for (const setter of SetterDecorators.all(constructor)) {
            const params = await resolverContext.paramList(ParamDecorators.methodParams(constructor, setter.id));
            (instance as any)[setter.id] = params[0];
        }
        return instance;
    }
}
