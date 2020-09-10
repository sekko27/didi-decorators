import { assertStrictEquals, assertEquals } from "../../deps.ts";
import { PropertyDecorators } from "../../lib/decorators/property/PropertyDecorators.ts";

Deno.test("non-decorated flag", () => {
    class A {}

    assertStrictEquals(PropertyDecorators.isTargetDecorated(A.prototype), false);
});

Deno.test("non-annotated property test", () => {
    class A {
        readonly a: number = 0;
    }

    assertStrictEquals(PropertyDecorators.isPropertyDecorated(A.prototype, "a"), false);
});

Deno.test("annotated property test", () => {
    class A {
        @PropertyDecorators.Property()
        readonly a: number = 0;
    }

    assertStrictEquals(PropertyDecorators.isPropertyDecorated(A.prototype, "a"), true);
});

Deno.test("non-readonly by default", () => {
    class A {
        @PropertyDecorators.Property()
        a: number = 0;
    }

    assertStrictEquals(PropertyDecorators.propertyMetadata(A.prototype, "a").readonly, false);
});

Deno.test("readonly is configurable", () => {
    class A {
        @PropertyDecorators.ReadOnly()
        a: number = 0;
    }

    assertStrictEquals(PropertyDecorators.propertyMetadata(A.prototype, "a").readonly, true);
});

Deno.test("enumerable by default", () => {
    class A {
        @PropertyDecorators.Property()
        a: number = 0;
    }

    assertStrictEquals(PropertyDecorators.propertyMetadata(A.prototype, "a").enumerable, true);
});

Deno.test("enumerable is configurable", () => {
    class A {
        @PropertyDecorators.Enumerable(false)
        a: number = 0;
    }

    assertStrictEquals(PropertyDecorators.propertyMetadata(A.prototype, "a").enumerable, false);
});

Deno.test("returns all decorated properties", () => {
    class A {
        @PropertyDecorators.Property()
        a: number = 0;

        b: string = "";

        @PropertyDecorators.ReadOnly()
        readonly c: boolean = false;
    }
    assertEquals(Array.from(PropertyDecorators.all(A.prototype)).map(md => md.name), ["a", "c"]);
})
