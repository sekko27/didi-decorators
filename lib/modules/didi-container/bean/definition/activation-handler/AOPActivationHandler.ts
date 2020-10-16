import { IActivationHandler } from "./IActivationHandler.ts";
import { IFactoryResolverContext } from "../builder/interfaces/IBeanResolver.ts";
import { AOPDecorators } from "../../../../../decorators/aop/AOPDecorators.ts";
import { IAOPMetadata } from "../../../../../decorators/aop/types/IAOPMetadata.ts";
import { IJoinCut } from "../../../../../decorators/aop/types/IJoinCut.ts";
import { IAroundAOPHandler } from "../../../../../decorators/aop/types/IAroundAOPHandler.ts";
import { IBeforeAOPHandler } from "../../../../../decorators/aop/types/IBeforeAOPHandler.ts";
import { IAfterAOPHandler } from "../../../../../decorators/aop/types/IAfterAOPHandler.ts";

export class AOPActivationHandler implements IActivationHandler {
    public static readonly ID: string = "AOP";

    readonly id: string = AOPActivationHandler.ID;

    async apply<T extends ObjectConstructor>(instance: T, resolverContext: IFactoryResolverContext): Promise<T> {
        const constructor = instance.constructor;
        let decorated = instance;
        for (const aop of AOPDecorators.all(constructor)) {
            decorated = await this.applyAOP(decorated, resolverContext, aop);
        }
        return decorated;
    }

    private async applyAOP<T>(instance: T, resolverContext: IFactoryResolverContext, aop: IAOPMetadata<any, any>): Promise<T> {
        const aopHandler = await resolverContext.bean(aop.handlerQuery);
        const handler = {
            get(target: any, property: PropertyKey, receiver: any) {
                const original = Reflect.get(target, property, receiver);
                if (property === aop.name) {
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
                                return (aopHandler as IAfterAOPHandler).apply(joinCut, original(...args), aop.handlerArgs);
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
