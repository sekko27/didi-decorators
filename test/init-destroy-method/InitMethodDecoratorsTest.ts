import { InitMethodDecorators } from "../../lib/decorators/init-destroy-method/InitMethodDecorators.ts";
import { assertEquals } from "../../deps.ts";

/*
Deno.test("should sort properly", () => {
    class Test {
        @InitMethodDecorators.Init(p => p.after("initMethod2"))
        initMethod1() {}

        @InitMethodDecorators.Init()
        initMethod2() {}

        @InitMethodDecorators.Init(p => p.before("initMethod2"))
        initMethod3() {}
    }

    assertEquals(Array.from(InitMethodDecorators.all(Test)), ["initMethod3", "initMethod2", "initMethod1"]);
});
*/

Deno.test("inheritance should be sorted properly", () => {
    class A {
        @InitMethodDecorators.Init(p => p.after("initMethod2"))
        initMethod1() {}

        @InitMethodDecorators.Init()
        initMethod2() {}
    }

    class B extends A {
        @InitMethodDecorators.Init(p => p.before("initMethod2"))
        initMethod3() {}
    }

    class C extends A {
        @InitMethodDecorators.Init(p => p.after("initMethod1"))
        initMethod3() {}
    }

    // assertEquals(Array.from(InitMethodDecorators.all(A)), ["initMethod2", "initMethod1"]);
    assertEquals(Array.from(InitMethodDecorators.all(B)), ["initMethod3", "initMethod2", "initMethod1"]);
    // assertEquals(Array.from(InitMethodDecorators.all(C)), ["initMethod2", "initMethod1", "initMethod3"]);
})
