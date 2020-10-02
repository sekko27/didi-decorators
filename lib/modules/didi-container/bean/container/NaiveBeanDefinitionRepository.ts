import { IBeanDefinitionRepository } from "./IBeanDefinitionRepository.ts";
import { IBeanDefinition } from "../definition/IBeanDefinition.ts";
import { IQuery } from "../../../didi-queries/interfaces/IQuery.ts";

export class NaiveBeanDefinitionRepository implements IBeanDefinitionRepository {
    private readonly storage: IBeanDefinition<any>[] = [];

    async get<T>(query: IQuery<T>): Promise<IBeanDefinition<T>[]> {
        return this.storage.filter(bd => query.match(bd.meta));
    }

    set(beanDefinition: IBeanDefinition<any>): this {
        this.storage.push(beanDefinition);
        return this;
    }

    [Symbol.iterator]() {
        return this.storage[Symbol.iterator]();
    }
}
