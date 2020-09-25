import { IQuery } from "../../didi-queries/interfaces/IQuery.ts";
import { IParamDecoratorMetadata } from "../../../decorators/param/IParamDecoratorMetadata.ts";

export interface IBeanDefinitionResolver<T> {
    bean(query: IQuery<T>): Promise<T>;
    paramList(paramMetadata: IParamDecoratorMetadata<any>[]): Promise<any[]>;
}

