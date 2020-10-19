import { ClassMetadataSetter } from "../../modules/didi-commons/metadata/ClassMetadataSetter.ts";
import { IParamDecoratorMetadata } from "./IParamDecoratorMetadata.ts";
import { Name } from "../../modules/didi-commons/Name.ts";
import { DecoratorSupport } from "../../modules/didi-commons/metadata/DecoratorSupport.ts";
import { BeanType } from "../../modules/didi-commons/BeanType.ts";
import { TypeSupport } from "../../modules/didi-commons/TypeSupport.ts";
import { MissingParameterDecorationError } from "./MissingParameterDecorationError.ts";
import { ITagsQuery } from "../../modules/didi-queries/interfaces/ITagsQuery.ts";
import { Query } from "../../modules/didi-queries/Query.ts";
import { TagsQuery } from "../../modules/didi-queries/TagsQuery.ts";

export class ParamDecorators {
    public static readonly NAME_TAG = "__name__";
    public static readonly METADATA_KEY: string = "metrix:decorators:param";
    private static readonly SETTER: ClassMetadataSetter<IParamDecoratorMetadata<any>[]> =
        new ClassMetadataSetter(
            ParamDecorators.METADATA_KEY,
            () => []
        );

    public static Inject<T>(paramName?: string) {
        return (target: any, methodName: Name, index: number) => {
            const md = ParamDecorators.getOrCreateMetadata<T>(target, methodName, index);
            md.paramName = paramName ?? DecoratorSupport.paramName(target, methodName, index);
        }
    }

    public static Query<T>(tagsQuery: ITagsQuery) {
        return (target: any, methodName: Name, index: number) => {
            const md = this.getOrCreateMetadata<T>(target, methodName, index);
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

    public static methodParams(target: any, method?: Name) : IParamDecoratorMetadata<any>[] {
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

    private static getOrCreateMetadata<T>(target: any, methodName: Name | undefined, index: number): IParamDecoratorMetadata<T> {
        const md = ParamDecorators.SETTER.metadata(target);
        const current = md.find((pmd) => pmd.index === index && pmd.methodName === methodName);
        if (current === undefined) {
            const type = DecoratorSupport.paramType(target, methodName, index) as BeanType<T>;
            const paramName = DecoratorSupport.paramName(target, methodName, index);
            const param: IParamDecoratorMetadata<T> = {index, methodName, query: new Query<T>(type), target, paramName};
            md.push(param);
            return param;
        } else {
            return current;
        }
    }
}
