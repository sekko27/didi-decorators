import { IActivationHandler } from "./IActivationHandler.ts";
import { PositionSupport } from "alg";
import { InitMethodActivationHandler } from "./InitMethodActivationHandler.ts";
import { SetterInjectionActivationHandler } from "./SetterInjectionActivationHandler.ts";
import { PropertyInjectionActivationHandler } from "./PropertyInjectionActivationHandler.ts";
import { AOPActivationHandler } from "./AOPActivationHandler.ts";
import { IBeanResolverContext, IFactoryResolverContext } from "../builder/interfaces/IBeanResolverForFactory.ts";
import { ConstructorPropertyInjectionActivationHandler } from "./ConstructorPropertyInjectionActivationHandler.ts";

export interface IReadonlyActivationHandlerChain extends Omit<IActivationHandler, "id"> {
}
export class ActivationHandlerChain implements IReadonlyActivationHandlerChain {
    private readonly handlers: PositionSupport<IActivationHandler> = new PositionSupport();

    public register(activationHandler: IActivationHandler, positioning?: (position: PositionSupport<IActivationHandler>) => void): this {
        this.handlers.elem(activationHandler);
        if (positioning !== undefined) {
            positioning(this.handlers);
        }
        return this;
    }

    async apply<T>(instance: T, resolverContext: IFactoryResolverContext<T>, beanResolverContext: IBeanResolverContext): Promise<T> {
        let decorated = instance;
        for (const handler of this.handlers.sort()) {
            decorated = await handler.apply(decorated, resolverContext, beanResolverContext);
        }
        return decorated;
    }

    public static default(): ActivationHandlerChain {
        return new ActivationHandlerChain()
            .register(new ConstructorPropertyInjectionActivationHandler())
            .register(new PropertyInjectionActivationHandler(), p => p.after(ConstructorPropertyInjectionActivationHandler.ID))
            .register(new SetterInjectionActivationHandler(), p => p.after(PropertyInjectionActivationHandler.ID))
            .register(new InitMethodActivationHandler(), p => p.after(SetterInjectionActivationHandler.ID))
            .register(new AOPActivationHandler(), p => p.after(InitMethodActivationHandler.ID));

    }
}

