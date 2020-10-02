import { IQuery } from "../../../../didi-queries/interfaces/IQuery.ts";
import { IBeanDefinition } from "../../definition/IBeanDefinition.ts";

export class AmbiguousBeanDefinitionQueryError extends Error {
    constructor(readonly query: IQuery<any>, readonly foundBeanDefinitions: IBeanDefinition<any>[]) {
        super(`More than one bean definition has been found: ${query.stringify()} :: ${foundBeanDefinitions.map(bd => bd.meta.type.name)}`);
    }
}
