import { IQuery } from "../../../../didi-queries/interfaces/IQuery.ts";

export class BeanDefinitionNotFoundError extends Error {
    constructor(readonly query: IQuery<any>) {
        super(`Bean definition not found: ${query.stringify()}`);
    }
}
