import { BeanType } from "../../modules/didi-commons/BeanType.ts";
import { Name } from "../../modules/didi-commons/Name.ts";
import { IQuery } from "../../modules/didi-queries/interfaces/IQuery.ts";

export interface IParamDecoratorMetadata<T> {
    target: BeanType<any>;
    methodName: Name | undefined;
    index: number;
    paramName: string;
    query: IQuery<T>;
}

export function StringifyParamDecoratorMetadata(md: IParamDecoratorMetadata<any>) {
    return `${md.target.constructor.name}.${String(md.methodName)}([${md.query.stringify()}] :: ${md.paramName} @ ${md.index})`;
}
