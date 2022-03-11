import { IDeSerDecoratorMetadata } from "../../lib/interfaces/IDeSerDecoratorMetadata.ts";
import { BeanType } from "../../../didi-commons/lib/types/BeanType.ts";
import { IDeSerDefinition } from "../../lib/interfaces/IDeSerDefinition.ts";
import { assertEquals, assertStrictEquals } from "std/testing/asserts.ts";
import { PrimitiveDeSerDefinition } from "../../lib/implementation/primitive/PrimitiveDeSerDefinition.ts";
import { DeSerDecorators } from "../../lib/implementation/base/DeSerDecorators.ts";
import { OptionalDeSerDefinition } from "../../lib/implementation/optional/OptionalDeSerDefinition.ts";
import { ArrayDeSerDefinition } from "../../lib/implementation/array/ArrayDeSerDefinition.ts";
import { TransientDeSerDefinition } from "../../lib/implementation/transient/TransientDeSerDefinition.ts";
import { EmbeddedDeSerDefinition } from "../../lib/implementation/embedded/EmbeddedDeSerDefinition.ts";
import { AutoDeSerDefinition } from "../../lib/implementation/auto/AutoDeSerDefinition.ts";

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
    BaseEquals(md, name, alias, EmbeddedDeSerDefinition);
    assertStrictEquals((md.definition as EmbeddedDeSerDefinition).type, type);
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
