import { IBeanResolverContext } from "../definition/builder/interfaces/IBeanResolverForFactory.ts";
import { IQuery } from "../../../didi-queries/interfaces/IQuery.ts";

export class BeanResolverContext implements IBeanResolverContext {
    constructor(private readonly path: IQuery<any>[] = []) {
    }

    next(query: IQuery<any>): IBeanResolverContext {
        return new BeanResolverContext(this.path.concat([query]));
    }

    stringify(): string {
        return this.path.reverse().map(query => query.stringify()).join(" ↤ ")
    }


}
