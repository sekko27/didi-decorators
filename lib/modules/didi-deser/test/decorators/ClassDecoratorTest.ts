import { ClassEquals, oneElement } from "./DecoratorTestUtil.ts";
import { Embedded } from "../../lib/implementation/embedded/EmbeddedDeSerDecorators.ts";

Deno.test("class decorator - it should decorate classes properly", () => {
    class X {}
    class A { @Embedded({alias: "y"}) private x: X; }

    ClassEquals(oneElement(A), "x", "y", X);
});
