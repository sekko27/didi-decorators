import { DeSerDecorators } from "../../decorators/DeSerDecorators.ts";
import { ClassEquals, oneElement, PrimitiveEquals } from "./DecoratorTestUtil.ts";

Deno.test("class decorator - it should decorate classes properly", () => {
    class X {}
    class A { @DeSerDecorators.Class({alias: "y"}) private x: X; }

    ClassEquals(oneElement(A), "x", "y", X);
});
