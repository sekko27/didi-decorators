import { ArrayEquals, oneElement } from "./DecoratorTestUtil.ts";
import { PrimitiveDeSerDefinition } from "../../lib/implementation/primitive/PrimitiveDeSerDefinition.ts";
import { assertStrictEquals, assertThrows } from "std/testing/asserts.ts";
import { InvalidFieldDeSerDefinitionError } from "../../lib/errors/InvalidFieldDeSerDefinitionError.ts";
import { ArrayDeSerDefinition } from "../../lib/implementation/array/ArrayDeSerDefinition.ts";
import { Arr, ArrDef } from "../../lib/implementation/array/ArrayDeSerDecorators.ts";
import { PrimitiveDef } from "../../lib/implementation/primitive/PrimitiveDeSerDecorators.ts";

Deno.test("array decorator - nested definition", () => {
    class A {
        @Arr(PrimitiveDef(Number), {alias: "b"})
        private a: number[];
    }

    const nestedDefinition = ArrayEquals(oneElement(A), "a", "b", PrimitiveDeSerDefinition);
    assertStrictEquals(nestedDefinition.type, Number);
});

Deno.test("array decorator - should throw error on non-array field - primitive", () => {
    assertThrows(() => {
        class A {
            @Arr(PrimitiveDef(Number))
            private a: number; // Non-array
        }
    }, InvalidFieldDeSerDefinitionError);
});

Deno.test("array decorator - should throw error on non-array field - object", () => {
    assertThrows(() => {
        class X {}
        class A {
            @Arr(PrimitiveDef(Number))
            private a: X; // Non-array
        }
    }, InvalidFieldDeSerDefinitionError);
});

Deno.test("array decorator - should support nested arrays", () => {
    class A {
        @Arr(ArrDef(PrimitiveDef(Number)))
        private a: number[][];
    }
    const nested = ArrayEquals(oneElement(A), "a", "a", ArrayDeSerDefinition);
    assertStrictEquals(nested.elementDefinition.constructor, PrimitiveDeSerDefinition);
    assertStrictEquals((nested.elementDefinition as PrimitiveDeSerDefinition).type, Number);
})

