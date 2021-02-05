import { DeSerDecorators } from "../../decorators/DeSerDecorators.ts";
import { Primitive } from "../../definition/package.ts";
import { AutoEquals, oneElement, OptionalEquals } from "./DecoratorTestUtil.ts";
import { PrimitiveDeSerDefinition } from "../../definition/PrimitiveDeSerDefinition.ts";
import { assertStrictEquals } from "../../../../../deps.ts";

Deno.test("auto decorator - nested definition", () => {
    class A {
        @DeSerDecorators.Auto(Primitive(Number), {alias: "b"})
        private a: number;
    }

    const nestedDefinition = AutoEquals(oneElement(A), "a", "b", PrimitiveDeSerDefinition);
    assertStrictEquals(nestedDefinition.type, Number);
});

