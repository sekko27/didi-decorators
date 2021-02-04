import { IDeSerDecoratorMetadata } from "../../decorators/IDeSerDecoratorMetadata.ts";
import { BeanType } from "../../../didi-commons/BeanType.ts";
import { IDeSerDefinition } from "../../definition/IDeSerDefinition.ts";
import { assertEquals, assertStrictEquals } from "../../../../../deps.ts";
import { PrimitiveType } from "../../../didi-commons/TypeSupport.ts";
import { PrimitiveDeSerDefinition } from "../../definition/PrimitiveDeSerDefinition.ts";
import { DeSerDecorators } from "../../decorators/DeSerDecorators.ts";

export function BaseEquals(md: IDeSerDecoratorMetadata, name: string, alias: string, definitionClass: BeanType<IDeSerDefinition>) {
    assertEquals(md.name, name);
    assertEquals(md.options?.alias, alias);
    assertStrictEquals(md.definition?.constructor, definitionClass);
}

export function PrimitiveEquals(md: IDeSerDecoratorMetadata, name: string, alias: string, type: any) {
    BaseEquals(md, name, alias, PrimitiveDeSerDefinition);
    assertStrictEquals((md.definition as PrimitiveDeSerDefinition).type, type);
}

export function oneElement(cls: any): IDeSerDecoratorMetadata {
    const mds = DeSerDecorators.all(cls);
    assertEquals(mds.length, 1);
    return mds[0];
}
