import { InitMethodDecorators } from "../../lib/init-destroy-method/InitMethodDecorators.ts";
import { assertEquals } from "../../deps.ts";

Deno.test("should sort properly", () => {
    class Test {
        @InitMethodDecorators.Init(p => p.after("initMethod2"))
        initMethod1() {}

        @InitMethodDecorators.Init()
        initMethod2() {}

        @InitMethodDecorators.Init(p => p.before("initMethod2"))
        initMethod3() {}
    }

    assertEquals(Array.from(InitMethodDecorators.all(Test.prototype)), ["initMethod3", "initMethod2", "initMethod1"]);
});
