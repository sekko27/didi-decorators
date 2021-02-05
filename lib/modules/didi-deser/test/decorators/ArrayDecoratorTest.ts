import { DeSerDecorators } from "../../decorators/DeSerDecorators.ts";
import { Arr, Primitive } from "../../definition/package.ts";
import { ArrayEquals, oneElement, OptionalEquals } from "./DecoratorTestUtil.ts";
import { PrimitiveDeSerDefinition } from "../../definition/PrimitiveDeSerDefinition.ts";
import { assertStrictEquals, assertThrows } from "../../../../../deps.ts";
import { InvalidFieldDeSerDefinitionError } from "../../errors/InvalidFieldDeSerDefinitionError.ts";
import { ArrayDeSerDefinition } from "../../definition/ArrayDeSerDefinition.ts";

Deno.test("array decorator - nested definition", () => {
    class A {
        @DeSerDecorators.Array(Primitive(Number), {alias: "b"})
        private a: number[];
    }

    const nestedDefinition = ArrayEquals(oneElement(A), "a", "b", PrimitiveDeSerDefinition);
    assertStrictEquals(nestedDefinition.type, Number);
});

Deno.test("array decorator - should throw error on non-array field - primitive", () => {
    assertThrows(() => {
        class A {
            @DeSerDecorators.Array(Primitive(Number))
            private a: number; // Non-array
        }
    }, InvalidFieldDeSerDefinitionError);
});

Deno.test("array decorator - should throw error on non-array field - object", () => {
    assertThrows(() => {
        class X {}
        class A {
            @DeSerDecorators.Array(Primitive(Number))
            private a: X; // Non-array
        }
    }, InvalidFieldDeSerDefinitionError);
});

Deno.test("array decorator - should support nested arrays", () => {
    class A {
        @DeSerDecorators.Array(Arr(Primitive(Number)))
        private a: number[][];
    }
    const nested = ArrayEquals(oneElement(A), "a", "a", ArrayDeSerDefinition);
    assertStrictEquals(nested.elementDefinition.constructor, PrimitiveDeSerDefinition);
    assertStrictEquals((nested.elementDefinition as PrimitiveDeSerDefinition).type, Number);
})

