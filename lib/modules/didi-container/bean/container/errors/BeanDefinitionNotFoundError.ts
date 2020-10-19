import { IBeanResolverContext } from "../../definition/builder/interfaces/IBeanResolverForFactory.ts";

export class BeanDefinitionNotFoundError extends Error {
    constructor(readonly context: IBeanResolverContext) {
        super(`Bean definition not found: ${context.stringify()}`);
    }
}
