import { oneElement, OptionalEquals } from "./DecoratorTestUtil.ts";
import { PrimitiveDeSerDefinition } from "../../lib/implementation/primitive/PrimitiveDeSerDefinition.ts";
import { assertStrictEquals } from "../../../../../deps.ts";
import { Optional } from "../../lib/implementation/optional/OptionalDeSerDecorators.ts";
import { PrimitiveDef } from "../../lib/implementation/primitive/PrimitiveDeSerDecorators.ts";

Deno.test("optional decorator - nested definition", () => {
    class A {
        @Optional(PrimitiveDef(Number), {alias: "b"})
        private a: number;
    }

    const nestedDefinition = OptionalEquals(oneElement(A), "a", "b", PrimitiveDeSerDefinition);
    assertStrictEquals(nestedDefinition.type, Number);
});

