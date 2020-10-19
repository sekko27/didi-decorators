import { IActivationHandler } from "./IActivationHandler.ts";
import { IBeanResolverContext, IFactoryResolverContext } from "../builder/interfaces/IBeanResolverForFactory.ts";
import { SetterDecorators } from "../../../../../decorators/setter/SetterDecorators.ts";
import { ParamDecorators } from "../../../../../decorators/param/ParamDecorators.ts";

export class SetterInjectionActivationHandler implements IActivationHandler {
    public static readonly ID: string = "SetterInjection";
    readonly id: string = SetterInjectionActivationHandler.ID;

    async apply<T extends {constructor: ObjectConstructor}>(instance: T, resolverContext: IFactoryResolverContext<T>, beanResolverContext: IBeanResolverContext): Promise<T> {
        const prototype = instance.constructor.prototype;
        for (const setter of SetterDecorators.all(prototype)) {
            const params = await resolverContext.paramList(ParamDecorators.methodParams(prototype, setter.id), beanResolverContext);
            (instance as any)[setter.id] = params[0];
        }
        return instance;
    }
}
