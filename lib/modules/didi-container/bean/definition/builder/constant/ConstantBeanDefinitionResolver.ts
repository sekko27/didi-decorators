import { IBeanDefinitionResolver } from "../interfaces/IBeanDefinitionResolver.ts";

export class ConstantBeanDefinitionResolver<T> implements IBeanDefinitionResolver<T> {
    constructor(
        private readonly value: T
    ) {
    }

    async resolve(): Promise<T> {
        return this.value;
    }

}
