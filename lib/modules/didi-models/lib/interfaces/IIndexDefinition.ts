export enum IIndexDirection {
    ASC = 1,
    DESC = -1,
}

export type FieldIndex = IIndexDirection | "text";

export interface IIndexQuery extends Object {}

/**
 * @see https://docs.mongodb.com/manual/indexes/
 */
export interface IIndexOptions {
    /**
     * @see https://docs.mongodb.com/manual/core/index-unique/
     */
    unique?: boolean;
    /**
     * @see https://docs.mongodb.com/manual/core/index-partial/
     */
    partial?: IIndexQuery;
    /**
     * @see https://docs.mongodb.com/manual/core/index-sparse/
     */
    sparse?: boolean;
    /**
     * @see https://docs.mongodb.com/manual/core/index-ttl/
     */
    ttl?: number;
    /**
     * @see https://docs.mongodb.com/manual/core/index-hidden/
     */
    hidden?: boolean;
}

export interface IIndexDefinition {
    fields: Map<string, FieldIndex>;
    options: IIndexOptions;
}
