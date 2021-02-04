import { ClassMetadataSetter } from "../../didi-commons/metadata/ClassMetadataSetter.ts";
import { DecoratorSupport } from "../../didi-commons/metadata/DecoratorSupport.ts";
import { TypeSupport } from "../../didi-commons/TypeSupport.ts";
import { IDeSerDecoratorMetadata, IDeSerDecoratorMetadataOptions } from "./IDeSerDecoratorMetadata.ts";
import { IDeSerDefinition } from "../definition/IDeSerDefinition.ts";
import { PrimitiveDeSerDefinition } from "../definition/PrimitiveDeSerDefinition.ts";
import { ArrayDeSerDefinition } from "../definition/ArrayDeSerDefinition.ts";
import { ClassDeSerDefinition } from "../definition/ClassDeSerDefinition.ts";
import { BeanType } from "../../didi-commons/BeanType.ts";
import { InvalidFieldDeSerDefinitionError } from "../errors/InvalidFieldDeSerDefinitionError.ts";
import { FieldDeSerAutoDetectionError } from "../errors/FieldDeSerAutoDetectionError.ts";
import { Arr, Auto, Class, Optional, Primitive, Transient } from "../definition/package.ts";

export class DeSerDecorators {
    public static readonly NAME_TAG = "__name__";
    public static readonly METADATA_KEY: string = "metrix:decorators:deser";
    private static readonly SETTER: ClassMetadataSetter<IDeSerDecoratorMetadata[]> =
        new ClassMetadataSetter(
            DeSerDecorators.METADATA_KEY,
            () => []
        );

    public static Primitive(options: IDeSerDecoratorMetadataOptions = {}) {
        return (cls: any, field: string) => {
            DeSerDecorators.DeSer(Primitive(DecoratorSupport.fieldType(cls, field)), options)(cls, field);
        };
    }

    public static Array(elementDefinition: IDeSerDefinition, options: IDeSerDecoratorMetadataOptions = {}) {
        return (cls: any, field: string) => {
            DeSerDecorators.DeSer(Arr(elementDefinition), options)(cls, field);
        };
    }

    public static Class(options: IDeSerDecoratorMetadataOptions = {}) {
        return (cls: any, field: string) => {
            DeSerDecorators.DeSer(Class(DecoratorSupport.fieldType(cls, field)), options)(cls, field);
        };
    }

    public static DeSer(valueDefinition?: IDeSerDefinition, options: IDeSerDecoratorMetadataOptions = {}) {
        return (cls: any, field: string) => {
            DeSerDecorators.getOrCreateMetadata(
                cls,
                field,
                DeSerDecorators.detectAndValidateDefinition(cls, field, valueDefinition),
                options
            );
        }
    }

    public static Transient() {
        return (cls: any, field: string) => {
            DeSerDecorators.getOrCreateMetadata(cls, field, Transient())
        }
    }

    public static Optional(valueDefinition?: IDeSerDefinition, options: IDeSerDecoratorMetadataOptions = {}) {
        return (cls: any, field: string) => {
            DeSerDecorators.getOrCreateMetadata(
                cls,
                field,
                Optional(DeSerDecorators.detectAndValidateDefinition(cls, field, valueDefinition)),
                options,
            );
        }
    }

    public static Auto(valueDefinition?: IDeSerDefinition, options: IDeSerDecoratorMetadataOptions = {}) {
        return (cls: any, field: string) => {
            DeSerDecorators.getOrCreateMetadata(
                cls,
                field,
                Auto(DeSerDecorators.detectAndValidateDefinition(cls, field, valueDefinition)),
                options
            );
        }
    }

    private static detectAndValidateDefinition(cls: any, field: string, definition?: IDeSerDefinition): IDeSerDefinition {
        const type = DecoratorSupport.fieldType(cls, field);
        const detected = DeSerDecorators.detectDefinition(type, definition);
        DeSerDecorators.validateDefinition(detected, type);
        return detected;
    }

    private static validateDefinition(definition: IDeSerDefinition, type: BeanType<any>) {
        const con = definition.constructor;
        switch (true) {
            case TypeSupport.isPrimitiveType(type):
                if (con !== PrimitiveDeSerDefinition) {
                    throw new InvalidFieldDeSerDefinitionError(`Expected primitive de-ser definition for "${type}", but "${con.name}" definition specified`);
                } else if ((definition as PrimitiveDeSerDefinition).type !== (type as any)) {
                    throw new InvalidFieldDeSerDefinitionError(`Primitive de-ser definition type does not match to type: "${type}" != "${(definition as PrimitiveDeSerDefinition).type}" of definition`);
                }
                break;
            case TypeSupport.isArrayType(type):
                if (con !== ArrayDeSerDefinition) {
                    throw new InvalidFieldDeSerDefinitionError(`Expected array de-ser definition for "${type?.name}": "${con.name}"`);
                }
                break;
            case TypeSupport.subTypeOf(type, Object):
                if (con !== ClassDeSerDefinition) {
                    throw new InvalidFieldDeSerDefinitionError(`Expected class de-ser definition from "${type?.name}": "${con.name}`)
                } else if (!TypeSupport.subTypeOf(type, (definition as ClassDeSerDefinition<any>).type)) {
                    throw new InvalidFieldDeSerDefinitionError(`Field type must extend the de-ser definitional class: "${type?.name}" - "${(definition as ClassDeSerDefinition<any>).type?.name}`);
                }
                break;
            default:
                throw new InvalidFieldDeSerDefinitionError(`Invalid de-ser definition: "${type?.name}": "${con.name}`);
        }
    }

    private static detectDefinition(type: BeanType<any>, definition?: IDeSerDefinition): IDeSerDefinition {
        if (definition !== undefined) {
            return definition;
        }
        switch (true) {
            case TypeSupport.isPrimitiveType(type):
                return new PrimitiveDeSerDefinition(type as any);
            case TypeSupport.isArrayType(type):
                throw new FieldDeSerAutoDetectionError(`Unable to auto-detect de-ser definition for arrays. Element definition is required.`);
            case TypeSupport.subTypeOf(type, Object):
                return new ClassDeSerDefinition(type);
            default:
                throw new FieldDeSerAutoDetectionError(`Unable to auto detect de-ser definition for type: "${type}"`);
        }
    }

    public static all(cls: any): IDeSerDecoratorMetadata[] {
        return DeSerDecorators.SETTER.metadata(cls.prototype);
    }

    private static getOrCreateMetadata<T>(
        target: any,
        field: string,
        definition: IDeSerDefinition,
        options: IDeSerDecoratorMetadataOptions = {}
    ): IDeSerDecoratorMetadata {
        const md = DeSerDecorators.SETTER.metadata(target);
        const current = md.find((pmd) => pmd.name === field);
        if (current === undefined) {
            const param: IDeSerDecoratorMetadata = {
                name: field,
                definition,
                options
            };
            md.push(param);
            return param;
        } else {
            return current;
        }
    }
}
