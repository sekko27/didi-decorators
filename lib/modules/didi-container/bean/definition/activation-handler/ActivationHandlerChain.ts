import { IActivationHandler } from "./IActivationHandler.ts";
import { PositionSupport } from "../../../../../../deps.ts";
import { InitMethodActivationHandler } from "./InitMethodActivationHandler.ts";
import { SetterInjectionActivationHandler } from "./SetterInjectionActivationHandler.ts";
import { PropertyInjectionActivationHandler } from "./PropertyInjectionActivationHandler.ts";
import { AOPActivationHandler } from "./AOPActivationHandler.ts";
import { IFactoryResolverContext } from "../builder/interfaces/IBeanResolver.ts";

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

    async apply<T extends {constructor: ObjectConstructor}>(instance: T, resolverContext: IFactoryResolverContext<T>): Promise<T> {
        let decorated = instance;
        for (const handler of this.handlers.sort()) {
            decorated = await handler.apply(decorated, resolverContext);
        }
        return decorated;
    }


    public static default(): ActivationHandlerChain {
        return new ActivationHandlerChain()
            .register(new PropertyInjectionActivationHandler())
            .register(new SetterInjectionActivationHandler(), p => p.after(PropertyInjectionActivationHandler.ID))
            .register(new InitMethodActivationHandler(), p => p.after(SetterInjectionActivationHandler.ID))
            .register(new AOPActivationHandler(), p => p.after(InitMethodActivationHandler.ID));

    }
}

