import { IBeanDefinition } from "./IBeanDefinition.ts";
import { TaggedTypeQuery } from "../../../didi-tags/TaggedTypeQuery.ts";
import { IBeanDefinitionCollection } from "../IBeanDefinitionCollection.ts";

export interface IBeanDefinitionInstantiation<T> {
    definition: IBeanDefinition<T>;
    beanCollection: IBeanDefinitionCollection;
    paramResolver: IParamResolver<T>;
}
export class BeanDefinitionService {
    async instantiate<T>(instantiation: IBeanDefinitionInstantiation<T>): Promise<T> {

    }

    dependencies<T>(definition: IBeanDefinition<T>): Promise<{query: TaggedTypeQuery<any>[], resolver: IParamResolver<T>}> {

    }
}
