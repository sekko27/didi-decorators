import { DeSerDecorators } from "../../decorators/DeSerDecorators.ts";
import { Primitive } from "../../definition/package.ts";
import { oneElement, OptionalEquals } from "./DecoratorTestUtil.ts";
import { PrimitiveDeSerDefinition } from "../../definition/PrimitiveDeSerDefinition.ts";
import { assertStrictEquals } from "../../../../../deps.ts";

Deno.test("optional decorator - nested definition", () => {
    class A {
        @DeSerDecorators.Optional(Primitive(Number), {alias: "b"})
        private a: number;
    }

    const nestedDefinition = OptionalEquals(oneElement(A), "a", "b", PrimitiveDeSerDefinition);
    assertStrictEquals(nestedDefinition.type, Number);
});

