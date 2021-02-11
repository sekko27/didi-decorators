import { IEntity } from "../../modules/didi-commons/lib/types/IEntity.ts";
import { IQuery } from "../../modules/didi-queries/interfaces/IQuery.ts";

export interface ISetterMetadata<T = any> extends IEntity {
    query: IQuery<T>;
    id: string;
}
