import { ClassMetadataSetter } from "../../modules/didi-commons/metadata/ClassMetadataSetter.ts";
import { IAOPMetadata } from "./types/IAOPMetadata.ts";
import { IAroundAOPHandler } from "./types/IAroundAOPHandler.ts";
import { IBeforeAOPHandler } from "./types/IBeforeAOPHandler.ts";
import { IAfterAOPHandler } from "./types/IAfterAOPHandler.ts";
import { BeanType } from "../../modules/didi-commons/BeanType.ts";
import { ITagsPredicate } from "../../modules/didi-tags/types/ITagsPredicate.ts";
import { Name } from "../../modules/didi-commons/Name.ts";
import { TaggedTypeQuery } from "../../modules/didi-tags/TaggedTypeQuery.ts";
import { PredicateSupport } from "../../modules/didi-predicates/PredicateSupport.ts";

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
        tagsPredicate: ITagsPredicate,
        handlerArgs?: A,
    ) {
        return (target: any, name: Name) => {
            AOPDecorators.SETTER.metadata(target).push({
                handler: new TaggedTypeQuery(handleType, tagsPredicate),
                handlerArgs,
                kind,
                name,
                type: target
            })
        }
    }

    public static Around<T extends IAroundAOPHandler<A>, A = void>(
        handlerType: BeanType<T>, handlerArgs?: A, tagsPredicate: ITagsPredicate = PredicateSupport.TRUE
    ) {
        return AOPDecorators.aop<IAroundAOPHandler<A>, A>("around", handlerType, tagsPredicate, handlerArgs);
    }

    public static Before<T extends IBeforeAOPHandler<A>, A = void>(
        handlerType: BeanType<T>,
        handlerArgs?: A,
        tagsPredicate: ITagsPredicate = PredicateSupport.TRUE,
    ) {
        return AOPDecorators.aop<IBeforeAOPHandler<A>, A>("before", handlerType, tagsPredicate, handlerArgs);
    }

    public static After<T extends IAfterAOPHandler<A>, A = void>(
        handlerType: BeanType<T>,
        handlerArgs?: A,
        tagsPredicate: ITagsPredicate = PredicateSupport.TRUE,
    ) {
        return AOPDecorators.aop<IAfterAOPHandler<A>, A>("after", handlerType, tagsPredicate, handlerArgs);
    }

    public static all(target: BeanType<any>): IterableIterator<IAOPMetadata<any, any>> {
        return AOPDecorators.SETTER.metadata(target)[Symbol.iterator]();
    }

    public static has(target: BeanType<any>): boolean {
        return AOPDecorators.SETTER.metadata(target).length > 0;
    }
}
