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

    async apply<T extends {constructor: ObjectConstructor}>(instance: T, resolverContext: IFactoryResolverContext<T>): Promise<T> {
        const constructor = instance.constructor;
        let decorated = instance;
        for (const aop of AOPDecorators.all(constructor.prototype)) {
            decorated = await this.applyAOP(decorated, resolverContext, aop);
        }
        return decorated;
    }

    private async applyAOP<T>(instance: T, resolverContext: IFactoryResolverContext<T>, aop: IAOPMetadata<any, any>): Promise<T> {
        const aopHandler = await resolverContext.bean(aop.handlerQuery);
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
