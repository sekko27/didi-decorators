import { assertStrictEquals, assertEquals } from "std/testing/asserts.ts";
import { PropertyDecorators } from "../../lib/decorators/property/PropertyDecorators.ts";

class X {}
class Y extends X {}

console.log(Object.getPrototypeOf(Y));

Deno.test("type inference", () => {
    class A {
        @PropertyDecorators.Property()
        a: number = 0;
    }
    assertStrictEquals(PropertyDecorators.getOrCreateMetadata(A, "a").type, Number);
});

Deno.test("non-readonly by default", () => {
    class A {
        @PropertyDecorators.Property()
        a: number = 0;
    }

    assertStrictEquals(PropertyDecorators.getOrCreateMetadata(A, "a").readonly, false);
});

Deno.test("readonly is configurable", () => {
    class A {
        @PropertyDecorators.ReadOnly()
        a: number = 0;
    }

    assertStrictEquals(PropertyDecorators.getOrCreateMetadata(A, "a").readonly, true);
});

Deno.test("enumerable by default", () => {
    class A {
        @PropertyDecorators.Property()
        a: number = 0;
    }

    assertStrictEquals(PropertyDecorators.getOrCreateMetadata(A, "a").enumerable, true);
});

Deno.test("enumerable is configurable", () => {
    class A {
        @PropertyDecorators.Enumerable(false)
        a: number = 0;
    }

    assertStrictEquals(PropertyDecorators.getOrCreateMetadata(A, "a").enumerable, false);
});

Deno.test("returns all decorated properties", () => {
    class A {
        @PropertyDecorators.Property()
        a: number = 0;

        b: string = "";

        @PropertyDecorators.ReadOnly()
        readonly c: boolean = false;
    }
    assertEquals(Array.from(PropertyDecorators.all(A)).map(md => md.name), ["a", "c"]);
})
