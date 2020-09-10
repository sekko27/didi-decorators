import { IBeanDefinition } from "./IBeanDefinition.ts";
import { TaggedTypeQuery } from "../../../didi-tags/TaggedTypeQuery.ts";
import { IBeanCollection } from "../IBeanCollection.ts";

export interface IBeanDefinitionInstantiation<T> {
    definition: IBeanDefinition<T>;
    beanCollection: IBeanCollection;
    paramResolver: IParamResolver<T>;
}
export class BeanDefinitionService {
    async instantiate<T>(instantiation: IBeanDefinitionInstantiation<T>): Promise<T> {

    }

    dependencies<T>(definition: IBeanDefinition<T>): Promise<{query: TaggedTypeQuery<any>[], resolver: IParamResolver<T>}> {

    }
}
