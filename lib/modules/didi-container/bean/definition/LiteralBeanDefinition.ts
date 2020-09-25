import { IBeanDefinition } from "./IBeanDefinition.ts";
import { BeanType } from "../../../didi-commons/BeanType.ts";
import { ITagsQuery } from "../../../didi-queries/interfaces/ITagsQuery.ts";
import { IQuery } from "../../../didi-queries/interfaces/IQuery.ts";
import { IParamDecoratorMetadata } from "../../../../decorators/param/IParamDecoratorMetadata.ts";
import { Constant } from "../factory/Constant.ts";
import { IScope } from "../scope/IScope.ts";
import { IBeanFactory } from "../factory/IBeanFactory.ts";

export class LiteralBeanDefinition<T> implements IBeanDefinition<T> {
    constructor(
        readonly type: BeanType<T>,
        readonly tags: Map<string, any>,
        readonly optional: boolean = false,
        readonly scope: IScope<T>,
        readonly factory: IBeanFactory<T>
    ) {
    }

    bean<B>(query: IQuery<B>): Promise<B> {
        throw new Error("Not supported");
    }

    paramList(metadata: IParamDecoratorMetadata<any>[]): Promise<any[]> {
        throw new Error("Not supported");
    }

    resolve(): Promise<T> {
        return Promise.resolve(undefined);
    }


}
