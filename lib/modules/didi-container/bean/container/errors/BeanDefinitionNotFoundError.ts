import { IBeanResolverContext } from "../../definition/builder/interfaces/IBeanResolverForFactory.ts";

export class BeanDefinitionNotFoundError extends Error {
    constructor(readonly context: IBeanResolverContext) {
        super(`No bean definition found: ${context.stringify()}`);
    }
}
