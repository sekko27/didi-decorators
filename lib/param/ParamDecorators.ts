import { ClassMetadataSetter } from "../ClassMetadataSetter.ts";
import { IParamDecoratorMetadata } from "./IParamDecoratorMetadata.ts";
import { Name } from "../modules/didi-commons/Name.ts";
import { DecoratorSupport } from "../DecoratorSupport.ts";
import { BeanType } from "../modules/didi-commons/BeanType.ts";
import { PredicateSupport } from "../modules/didi-predicates/PredicateSupport.ts";
import { ITagsPredicate } from "../modules/didi-tags/types/ITagsPredicate.ts";
import { TagsPredicates } from "../modules/didi-tags/TagsPredicates.ts";
import { TaggedTypeQuery } from "../modules/didi-tags/TaggedTypeQuery.ts";
import { TypeSupport } from "../modules/didi-commons/TypeSupport.ts";
import { MissingParameterDecorationError } from "./MissingParameterDecorationError.ts";

export class ParamDecorators {
    public static readonly METADATA_KEY: string = "metrix:decorators:param";
    private static readonly SETTER: ClassMetadataSetter<IParamDecoratorMetadata<any>[]> =
        new ClassMetadataSetter(
            ParamDecorators.METADATA_KEY,
            () => []
        );

    public static Inject<T>(paramName?: string) {
        return (target: any, methodName: Name, index: number) => {
            const md = ParamDecorators.getOrCreateMetadata<T>(target, methodName, index);
            if (paramName !== undefined) {
                md.paramName = paramName;
            }
        }
    }

    public static Query<T>(tagsPredicate: ITagsPredicate) {
        return (target: any, methodName: Name, index: number) => {
            const md = this.getOrCreateMetadata<T>(target, methodName, index);
            md.query = PredicateSupport.and(md.query, tagsPredicate);
        }
    }

    public static ByName<T>(name: Name) {
        return ParamDecorators.Query(TagsPredicates.strict(TaggedTypeQuery.NAME_TAG, name));
    }

    /**
     * Dummy method for ensuring annotation processing on method.
     */
    public static Method() {
        return () => {};
    }

    public static resolveParamsMetadata(target: any, method: Name) : IParamDecoratorMetadata<any>[] {
        const rawParameters: BeanType<any>[] | undefined = DecoratorSupport.paramTypes(target, method);
        if (rawParameters === undefined && TypeSupport.hasParameter(method === undefined ? target : target[method])) {
            throw new MissingParameterDecorationError(target, method);
        }
        const annotatedMethodParams = ParamDecorators.SETTER.metadata(target)
            .filter(md => md.methodName === method);
        return (rawParameters || []).map((p, ix) => {
            const annotatedMethodParam = annotatedMethodParams.find((amp) => amp.index === ix);
            return annotatedMethodParam === undefined
                ? ParamDecorators.getOrCreateMetadata(target, method, ix)
                : annotatedMethodParam;
        })
    }

    private static getOrCreateMetadata<T>(target: any, methodName: Name, index: number): IParamDecoratorMetadata<T> {
        const md = ParamDecorators.SETTER.metadata(target);
        const current = md.find((pmd) => pmd.index === index && pmd.methodName === methodName);
        if (current === undefined) {
            const type = DecoratorSupport.paramType(target, methodName, index) as BeanType<T>;
            const param = {index, methodName, query: PredicateSupport.TRUE, target, type};
            md.push(param);
            return param;
        } else {
            return current;
        }
    }
}
