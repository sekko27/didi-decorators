import { IBeanDefinitionMeta } from "../definition/IBeanDefinitionMeta.ts";
import { IMetaRepository } from "./IMetaRepository.ts";
import { IQuery } from "../../../didi-queries/interfaces/IQuery.ts";

export class NaiveMetaRepository<T extends { meta: IBeanDefinitionMeta<any> }> implements IMetaRepository<T> {
    private readonly storage: T[] = [];

    async get<B>(query: IQuery<B>): Promise<T[]> {
        return this.storage.filter(e => query.match(e.meta));
    }

    set(elem: T): this {
        this.storage.push(elem);
        return this;
    }

    [Symbol.iterator]() {
        return this.storage[Symbol.iterator]();
    }

}
