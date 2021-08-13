import { ClassEquals, oneElement } from "./DecoratorTestUtil.ts";
import { Embedded } from "../../lib/implementation/embedded/EmbeddedDeSerDecorators.ts";
import { Primitive } from "../../lib/implementation/primitive/PrimitiveDeSerDecorators.ts";

Deno.test("class decorator - it should decorate classes properly", () => {

    class X {@Primitive() a: number}
    class A { @Embedded({alias: "y"}) private x: X; }

    ClassEquals(oneElement(A), "x", "y", X);
});
