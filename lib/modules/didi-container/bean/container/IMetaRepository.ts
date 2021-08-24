import { IBeanDefinitionMeta } from "../definition/IBeanDefinitionMeta.ts";
import { IQuery } from "../../../didi-queries/interfaces/IQuery.ts";

export interface IMetaRepository<T extends {meta: IBeanDefinitionMeta<any>}> extends Iterable<T> {
    set(elem: T): this;
    get<B>(query: IQuery<B>): Promise<T[]>;

}
