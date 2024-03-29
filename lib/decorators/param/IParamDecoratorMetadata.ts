import { BeanType } from "../../modules/didi-commons/lib/types/BeanType.ts";
import { Name } from "../../modules/didi-commons/lib/types/Name.ts";
import { IQuery } from "../../modules/didi-queries/interfaces/IQuery.ts";

export interface IParamDecoratorMetadata<T> {
    target: BeanType<any>;
    methodName: Name | undefined;
    index: number;
    paramName: string;
    query: IQuery<T>;
}

export function StringifyParamDecoratorMetadata(md: IParamDecoratorMetadata<any>) {
    return `${md.target.name}.${String(md.methodName ?? "<constructor>")}([${md.query.stringify()}] :: ${md.paramName} @ ${md.index})`;
}
