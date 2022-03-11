import { AutoEquals, oneElement } from "./DecoratorTestUtil.ts";
import { PrimitiveDeSerDefinition } from "../../lib/implementation/primitive/PrimitiveDeSerDefinition.ts";
import { assertStrictEquals } from "std/testing/asserts.ts";
import { Auto } from "../../lib/implementation/auto/AutoDeSerDecorators.ts";
import { PrimitiveDef } from "../../lib/implementation/primitive/PrimitiveDeSerDecorators.ts";

Deno.test("auto decorator - nested definition", () => {
    class A {
        @Auto(PrimitiveDef(Number), {alias: "b"})
        private a: number;
    }

    const nestedDefinition = AutoEquals(oneElement(A), "a", "b", PrimitiveDeSerDefinition);
    assertStrictEquals(nestedDefinition.type, Number);
});

