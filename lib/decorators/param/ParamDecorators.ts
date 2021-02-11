import { ClassMetadataSetter } from "../../modules/didi-commons/lib/metadata/ClassMetadataSetter.ts";
import { IParamDecoratorMetadata } from "./IParamDecoratorMetadata.ts";
import { Name } from "../../modules/didi-commons/lib/types/Name.ts";
import { DecoratorSupport } from "../../modules/didi-commons/lib/metadata/DecoratorSupport.ts";
import { BeanType } from "../../modules/didi-commons/lib/types/BeanType.ts";
import { TypeSupport } from "../../modules/didi-commons/lib/utils/TypeSupport.ts";
import { MissingParameterDecorationError } from "./MissingParameterDecorationError.ts";
import { ITagsQuery } from "../../modules/didi-queries/interfaces/ITagsQuery.ts";
import { Query } from "../../modules/didi-queries/Query.ts";
import { TagsQuery } from "../../modules/didi-queries/TagsQuery.ts";
import { ArrayElementEqualsOperator, ArrayUtil } from "../../modules/didi-commons/lib/utils/ArrayUtil.ts";

export class ParamDecorators {
    public static readonly NAME_TAG = "__name__";
    public static readonly METADATA_KEY: string = "metrix:decorators:param";
    private static MetadataEquals: ArrayElementEqualsOperator<IParamDecoratorMetadata<any>> =
        (_1, _2) => _1.methodName === _2.methodName;

    private static readonly SETTER: ClassMetadataSetter<IParamDecoratorMetadata<any>[]> =
        new ClassMetadataSetter(
            ParamDecorators.METADATA_KEY,
            () => []
        );

    public static Inject<T>(paramName?: string) {
        return (constructorOrPrototype: any, methodName: Name, index: number) => {
            const md = ParamDecorators.getOrCreateMetadata<T>(constructorOrPrototype, methodName, index);
            md.paramName = paramName ?? DecoratorSupport.paramName(constructorOrPrototype, methodName, index);
        }
    }

    public static Query<T>(tagsQuery: ITagsQuery) {
        return (constructorOrPrototype: any, methodName: Name, index: number) => {
            const md = this.getOrCreateMetadata<T>(constructorOrPrototype, methodName, index);
            md.query = md.query.mergeTagsOnly(tagsQuery);
        }
    }

    public static ByName<T>(name: Name) {
        return ParamDecorators.Query(TagsQuery.tagQuery(ParamDecorators.NAME_TAG, name));
    }

    /**
     * Dummy method for ensuring annotation processing on method.
     */
    public static Method() {
        return (_target: any, _method: Name) => {};
    }

    public static methodParams(ctr: any, method: Name) : IParamDecoratorMetadata<any>[] {
        const prototype = ctr.prototype;
        const rawParameters: BeanType<any>[] | undefined = DecoratorSupport.paramTypes(prototype, method);
        if (rawParameters === undefined && TypeSupport.hasParameter(prototype[method])) {
            throw new MissingParameterDecorationError(prototype, method);
        }
        const annotatedMethodParams = ParamDecorators.SETTER.metadata(
            prototype,
            ArrayUtil.concatReducerOnlyFirstByLevels(ParamDecorators.MetadataEquals),
            []
        ).filter(md => md.methodName === method);
        return (rawParameters || []).map((p, ix) => {
            const annotatedMethodParam = annotatedMethodParams.find((amp) => amp.index === ix);
            return annotatedMethodParam === undefined
                ? ParamDecorators.getOrCreateMetadata(prototype, method, ix)
                : annotatedMethodParam;
        });
    }

    public static constructorParams(ctr: any): IParamDecoratorMetadata<any>[] {
        const rawParameters: BeanType<any>[] | undefined = DecoratorSupport.paramTypes(ctr, undefined);
        if (rawParameters === undefined && TypeSupport.hasParameter(ctr)) {
            throw new MissingParameterDecorationError(ctr);
        }
        const annotatedMethodParams = ParamDecorators.SETTER.constructorMetadata(
            ctr,
            ArrayUtil.concatReducerOnlyFirstByLevels(ParamDecorators.MetadataEquals),
            []
        );
        return (rawParameters || []).map((p, ix) => {
            const annotatedMethodParam = annotatedMethodParams.find((amp) => amp.index === ix);
            return annotatedMethodParam === undefined
                ? ParamDecorators.getOrCreateMetadata(ctr, undefined, ix)
                : annotatedMethodParam;
        })

    }
    private static getOrCreateMetadata<T>(reflectTarget: any, methodName: Name | undefined, index: number): IParamDecoratorMetadata<T> {
        const isConstructor = methodName === undefined;
        const md = ParamDecorators.SETTER.ownMetadata(reflectTarget);
        const current = md.find((pmd) => pmd.index === index && pmd.methodName === methodName);
        if (current === undefined) {
            const type = DecoratorSupport.paramType(reflectTarget, methodName, index) as BeanType<T>;
            const paramName = DecoratorSupport.paramName(reflectTarget, methodName, index);
            const target = isConstructor ? reflectTarget : reflectTarget.constructor;
            const param: IParamDecoratorMetadata<T> = {index, methodName, query: new Query<T>(type), target, paramName};
            md.push(param);
            return param;
        } else {
            return current;
        }
    }
}
