import { DestroyMethodDecorators } from "../../lib/init-destroy-method/DestroyMethodDecorators.ts";
import { assertEquals } from "../../deps.ts";

Deno.test("should sort properly", () => {
    class Test {
        @DestroyMethodDecorators.Destroy(p => p.after("destroyMethod2"))
        destroyMethod1() {}

        @DestroyMethodDecorators.Destroy()
        destroyMethod2() {}

        @DestroyMethodDecorators.Destroy(p => p.before("destroyMethod2"))
        destroyMethod3() {}
    }

    assertEquals(Array.from(DestroyMethodDecorators.all(Test.prototype)), ["destroyMethod3", "destroyMethod2", "destroyMethod1"]);
});
