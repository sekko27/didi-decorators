import { IActivationHandler } from "./IActivationHandler.ts";
import { IBeanResolverContext, IFactoryResolverContext } from "../builder/interfaces/IBeanResolverForFactory.ts";
import { AOPDecorators } from "../../../../../decorators/aop/AOPDecorators.ts";
import { IAOPMetadata } from "../../../../../decorators/aop/types/IAOPMetadata.ts";
import { IJoinCut } from "../../../../../decorators/aop/types/IJoinCut.ts";
import { IAroundAOPHandler } from "../../../../../decorators/aop/types/IAroundAOPHandler.ts";
import { IBeforeAOPHandler } from "../../../../../decorators/aop/types/IBeforeAOPHandler.ts";
import { IAfterAOPHandler } from "../../../../../decorators/aop/types/IAfterAOPHandler.ts";

export class AOPActivationHandler implements IActivationHandler {
    public static readonly ID: string = "AOP";

    readonly id: string = AOPActivationHandler.ID;

    async apply<T>(instance: T, resolverContext: IFactoryResolverContext<T>, beanResolverContext: IBeanResolverContext): Promise<T> {
        const constructor = (instance as any).constructor;
        let decorated = instance;
        for (const aop of AOPDecorators.all(constructor)) {
            decorated = await this.applyAOP(decorated, resolverContext, aop, beanResolverContext);
        }
        return decorated;
    }

    private async applyAOP<T>(instance: T, resolverContext: IFactoryResolverContext<T>, aop: IAOPMetadata<any, any>, beanResolverContext: IBeanResolverContext): Promise<T> {
        const aopHandler = await resolverContext.bean(aop.handlerQuery, beanResolverContext);
        const handler = {
            get(target: any, property: PropertyKey, receiver: any) {
                const original = Reflect.get(target, property, receiver);
                if (property === aop.name) {
                    // TODO Can it be promise-based?
                    return (...args: any[]) => {
                        const joinCut: IJoinCut<T> = {
                            args,
                            instance,
                            methodName: aop.name,
                            type: (instance as any).constructor
                        };
                        switch (aop.kind) {
                            case "around":
                                return (aopHandler as IAroundAOPHandler).apply(joinCut, original, aop.handlerArgs);
                            case "after":
                                const result = original(...args);
                                (aopHandler as IAfterAOPHandler).apply(joinCut, result, aop.handlerArgs);
                                return result;
                            case "before":
                                (aopHandler as IBeforeAOPHandler).apply(joinCut, aop.handlerArgs);
                                return original(...args);
                        }
                    };
                } else {
                    return original;
                }
            }
        };
        return new Proxy(instance, handler);
    }
}
