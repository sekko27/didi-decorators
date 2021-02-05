import { IDeSerDecoratorMetadata } from "../../decorators/IDeSerDecoratorMetadata.ts";
import { BeanType } from "../../../didi-commons/BeanType.ts";
import { IDeSerDefinition } from "../../definition/IDeSerDefinition.ts";
import { assertEquals, assertStrictEquals } from "../../../../../deps.ts";
import { PrimitiveDeSerDefinition } from "../../definition/PrimitiveDeSerDefinition.ts";
import { DeSerDecorators } from "../../decorators/DeSerDecorators.ts";
import { OptionalDeSerDefinition } from "../../definition/OptionalDeSerDefinition.ts";
import { ArrayDeSerDefinition } from "../../definition/ArrayDeSerDefinition.ts";
import { TransientDeSerDefinition } from "../../definition/TransientDeSerDefinition.ts";
import { ClassDeSerDefinition } from "../../definition/ClassDeSerDefinition.ts";
import { AutoDeSerDefinition } from "../../definition/AutoDeSerDefinition.ts";

export function BaseEquals(md: IDeSerDecoratorMetadata, name: string, alias: string, definitionClass: BeanType<IDeSerDefinition>) {
    assertEquals(md.name, name);
    assertEquals(md.options?.alias, alias);
    assertStrictEquals(md.definition?.constructor, definitionClass);
}

export function PrimitiveEquals(md: IDeSerDecoratorMetadata, name: string, alias: string, type: any) {
    BaseEquals(md, name, alias, PrimitiveDeSerDefinition);
    assertStrictEquals((md.definition as PrimitiveDeSerDefinition).type, type);
}

export function OptionalEquals<V extends IDeSerDefinition>(md: IDeSerDecoratorMetadata, name: string, alias: string, type: BeanType<V>): V {
    BaseEquals(md, name, alias, OptionalDeSerDefinition);
    const valueDefinition: IDeSerDefinition = (md.definition as OptionalDeSerDefinition).valueDefinition;
    assertStrictEquals(valueDefinition.constructor, type);
    return valueDefinition as V;
}

export function AutoEquals<V extends IDeSerDefinition>(md: IDeSerDecoratorMetadata, name: string, alias: string, type: BeanType<V>): V {
    BaseEquals(md, name, alias, AutoDeSerDefinition);
    const valueDefinition: IDeSerDefinition = (md.definition as AutoDeSerDefinition).valueDefinition;
    assertStrictEquals(valueDefinition.constructor, type);
    return valueDefinition as V;
}

export function TransientEquals(md: IDeSerDecoratorMetadata, name: string) {
    BaseEquals(md, name, name, TransientDeSerDefinition);
}

export function ClassEquals(md: IDeSerDecoratorMetadata, name: string, alias: string, type: BeanType<any>) {
    BaseEquals(md, name, alias, ClassDeSerDefinition);
    assertStrictEquals((md.definition as ClassDeSerDefinition).type, type);
}
export function ArrayEquals<V extends IDeSerDefinition>(md: IDeSerDecoratorMetadata, name: string, alias: string, elementDefinition: BeanType<V>): V {
    BaseEquals(md, name, alias, ArrayDeSerDefinition);
    const elDefinition: IDeSerDefinition = (md.definition as ArrayDeSerDefinition).elementDefinition;
    assertStrictEquals(elDefinition.constructor, elementDefinition);
    return elDefinition as V;
}

export function oneElement(cls: any): IDeSerDecoratorMetadata {
    const mds = DeSerDecorators.all(cls);
    assertEquals(mds.length, 1);
    return mds[0];
}
