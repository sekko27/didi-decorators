import { IBeanDefinition } from "../definition/IBeanDefinition.ts";
import { IQuery } from "../../../didi-queries/interfaces/IQuery.ts";

export interface IBeanDefinitionRepository extends Iterable<IBeanDefinition<any>> {
    set(beanDefinition: IBeanDefinition<any>): this;
    get<T>(query: IQuery<T>): Promise<IBeanDefinition<T>[]>;
}
