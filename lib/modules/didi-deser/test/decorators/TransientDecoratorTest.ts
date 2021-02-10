import { oneElement, OptionalEquals, TransientEquals } from "./DecoratorTestUtil.ts";
import { Transient } from "../../lib/implementation/transient/TransientDeSerDecorators.ts";

Deno.test("transient decorator - nested definition", () => {
    class A {
        @Transient()
        private a: number;
    }

    TransientEquals(oneElement(A), "a");
});

