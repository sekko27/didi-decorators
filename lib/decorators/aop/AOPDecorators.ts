import { ClassMetadataSetter } from "../../modules/didi-commons/metadata/ClassMetadataSetter.ts";
import { IAOPMetadata } from "./types/IAOPMetadata.ts";
import { IAroundAOPHandler } from "./types/IAroundAOPHandler.ts";
import { IBeforeAOPHandler } from "./types/IBeforeAOPHandler.ts";
import { IAfterAOPHandler } from "./types/IAfterAOPHandler.ts";
import { BeanType } from "../../modules/didi-commons/BeanType.ts";
import { Name } from "../../modules/didi-commons/Name.ts";
import { Query } from "../../modules/didi-queries/Query.ts";
import { ITagsQuery } from "../../modules/didi-queries/interfaces/ITagsQuery.ts";
import { TagsQuery } from "../../modules/didi-queries/TagsQuery.ts";

export class AOPDecorators {
    private static readonly METADATA_KEY: string = "metrix:decorators:aop";
    private static readonly SETTER: ClassMetadataSetter<IAOPMetadata<any, any>[]> = new ClassMetadataSetter(
        AOPDecorators.METADATA_KEY,
        () => []
    );

    private static aop<
        T extends IAroundAOPHandler<A> | IBeforeAOPHandler<A> | IAfterAOPHandler<A>,
        A = void
    >(
        kind: "around" | "after" | "before",
        handleType: BeanType<T>,
        tags: ITagsQuery,
        handlerArgs?: A,
    ) {
        return (target: any, name: Name) => {
            AOPDecorators.SETTER.metadata(target).push({
                handlerQuery: new Query<T>(handleType, tags),
                handlerArgs,
                kind,
                name,
            } as IAOPMetadata<T, A>)
        }
    }

    public static Around<T extends IAroundAOPHandler<A>, A = void>(
        handlerType: BeanType<T>,
        handlerArgs?: A,
        tags: ITagsQuery = TagsQuery.EMPTY,
    ) {
        return AOPDecorators.aop<IAroundAOPHandler<A>, A>("around", handlerType, tags, handlerArgs);
    }

    public static Before<T extends IBeforeAOPHandler<A>, A = void>(
        handlerType: BeanType<T>,
        handlerArgs?: A,
        tags: ITagsQuery = TagsQuery.EMPTY,
    ) {
        return AOPDecorators.aop<IBeforeAOPHandler<A>, A>("before", handlerType, tags, handlerArgs);
    }

    public static After<T extends IAfterAOPHandler<A>, A = void>(
        handlerType: BeanType<T>,
        handlerArgs?: A,
        tags: ITagsQuery = TagsQuery.EMPTY,
    ) {
        return AOPDecorators.aop<IAfterAOPHandler<A>, A>("after", handlerType, tags, handlerArgs);
    }

    public static all(target: any): IterableIterator<IAOPMetadata<any, any>> {
        return AOPDecorators.SETTER.metadata(target)[Symbol.iterator]();
    }

    public static has(target: BeanType<any>): boolean {
        return AOPDecorators.SETTER.metadata(target).length > 0;
    }
}
