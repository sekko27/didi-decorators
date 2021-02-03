import { ClassMetadataSetter } from "../../../didi-commons/metadata/ClassMetadataSetter.ts";
import { IModelMetadata } from "../interfaces/IModelMetadata.ts";
import { IDeSerDefinition } from "../interfaces/IDeSerDefinition.ts";
import { Name } from "../../../didi-commons/Name.ts";
import { IModelFieldMetadata } from "../interfaces/IModelFieldMetadata.ts";
import { ArrayDeSerDefinition } from "../interfaces/ArrayDeSerDefinition.ts";
import { TypeSupport } from "../../../didi-commons/TypeSupport.ts";
import { DecoratorSupport } from "../../../didi-commons/metadata/DecoratorSupport.ts";
import { PrimitiveDeSerDefinition } from "../interfaces/PrimitiveDeSerDefinition.ts";

export class ModelDecorators {
    public static readonly NAME_TAG = "__name__";
    public static readonly METADATA_KEY: string = "metrix:decorators:models";
    private static readonly SETTER: ClassMetadataSetter<IModelMetadata<any>> =
        new ClassMetadataSetter(
            ModelDecorators.METADATA_KEY,
            (target) => ({
                alias: target.name,
                fields: [],
                indices: []
            })
        );

    public static Model(alias?: string) {
        return (cls: any) => {
            const md = ModelDecorators.SETTER.metadata(cls);
            if (alias !== undefined) {
                md.alias = alias;
            }
        };
    }

    public static Array(elementDefinition: IDeSerDefinition) {
        return (cls: any, name: string) => {
            const type = DecoratorSupport.fieldType(cls, name);
            if (!TypeSupport.isArrayType(type)) {
                throw new TypeError(`Expected array (because of @Array decorator) on "${cls.name}.${name}"`);
            }
            ModelDecorators.getOrCreateField(cls, name).definition = new ArrayDeSerDefinition(elementDefinition);
        }
    }

    public static Primitive() {
        return (cls: any, name: string) => {
            const type = DecoratorSupport.fieldType(cls, name);
            if (!TypeSupport.isPrimitiveType(type)) {
                throw new TypeError(`Expected primitive type (because of @Primitive decorator) on "${cls.name}.${name}`);
            }
            ModelDecorators.getOrCreateField(cls, name).definition = new PrimitiveDeSerDefinition(type);
        }
    }

    public static Embed() {

    }
    public static Alias(alias: string) {
        return (cls: any, name: string) => {
            ModelDecorators.getOrCreateField(cls, name).alias = alias;
        }
    }

    private static getOrCreateField(cls: any, name: string): IModelFieldMetadata {
        const md = ModelDecorators.SETTER.metadata(cls);
        const field = md.fields.find(field => field.name === name);
        if (field === undefined) {
            const newField: IModelFieldMetadata = {name};
            md.fields.push(newField);
            return newField;
        } else {
            return field;
        }
    }

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
