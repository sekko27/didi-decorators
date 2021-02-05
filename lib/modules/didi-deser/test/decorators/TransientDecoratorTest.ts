import { DeSerDecorators } from "../../decorators/DeSerDecorators.ts";
import { Primitive } from "../../definition/package.ts";
import { oneElement, OptionalEquals, TransientEquals } from "./DecoratorTestUtil.ts";
import { PrimitiveDeSerDefinition } from "../../definition/PrimitiveDeSerDefinition.ts";
import { assertStrictEquals } from "../../../../../deps.ts";

Deno.test("transient decorator - nested definition", () => {
    class A {
        @DeSerDecorators.Transient()
        private a: number;
    }

    TransientEquals(oneElement(A), "a");
});

