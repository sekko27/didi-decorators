import { assertEquals, assertStrictEquals, assertThrows } from "std/testing/asserts.ts";
import { NamedSealedClass, SealedDecorators } from "../SealedDecorators.ts";

const named = Symbol.for("name");

const assertNamedSealedClasses = (actual: any[], expected: any[]) => {
    assertStrictEquals(actual.length, expected.length);
    return actual.forEach( (nsc, index) => {
        assertStrictEquals(nsc.type, expected[index].type);
        assertStrictEquals(nsc[named], expected[index][named]);
    });

}

Deno.test( ("Sealed classes contains own and all classes from the chain of inheritance with the given alias"), () => {

    class A {}
    class B extends A {}
    class C extends A {}
    class D extends B {}

    @SealedDecorators.forClass(A)(B, SealedDecorators.named("alias", C), D)
    class SealedA {}

    const expected : NamedSealedClass<any>[]= [
        SealedDecorators.named(A.name, A),
        SealedDecorators.named(B.name, B),
        SealedDecorators.named("alias", C),
        SealedDecorators.named(D.name, D),
    ];
    assertNamedSealedClasses(SealedDecorators.getSealedClasses(A), expected);

});

Deno.test("Should get the implementation class by alias", () => {
    class A {}
    class B extends  A {}
    class C extends  B {}

    @SealedDecorators.forClass(A)(B, SealedDecorators.named("alias", C))
    class SealedA {}

    assertStrictEquals(SealedDecorators.getChildClass(A, "alias"), C);
})

Deno.test("Should get the implementation alias by type", () => {
    class A {}
    class B extends A {}
    class C extends B {}

    @SealedDecorators.forClass(A)(B, SealedDecorators.named("aliasForC", C))
    class SealedA {}

    assertStrictEquals(SealedDecorators.getChildAlias(A, C), "aliasForC");
});

Deno.test("Should check the inheritance", () =>  {
    class A {}
    class B {}

    assertThrows( () => {
        @SealedDecorators.forClass(A)(B)
        class SealedA {}
    });
});

Deno.test("Should check the given aliases are unique", () => {
    class A {}
    class B extends A {}
    class C extends A {}

    assertThrows( () => {
        @SealedDecorators.forClass(A)(SealedDecorators.named("alias", B), SealedDecorators.named("alias", C))
        class SealedA {}
    })
});

Deno.test("Should check the implementation classes are unique", () => {
    class A {}
    class B extends A {}

    assertThrows( () => {
        @SealedDecorators.forClass(A)(SealedDecorators.named("alias", B), SealedDecorators.named(B.name, B))
        class SealedA {}
    })
});

Deno.test(
    "sealed classes should depends on first decorated parent",
    /**
     * <pre>
     * A
     *  -> B*
     *   -> C*(B)
     *    => D(B,C)
     *     -> G(B)
     *    -> F(C)
     *   -> E(B)
     * </pre>
     * In this case:
     *   - first decorated parent of D is C
     *   - C has defined sealed classes: D, F
     *   - F is not child of D, but D is, so only D is the sealed class of D
     */
    () => {
    class A {}
    class B extends A {}
    class C extends B {}
    class D extends C {}
    class E extends B {}
    class F extends C {}
    class G extends D {}

    @SealedDecorators.forClass(B)(C, D, E, G)
    @SealedDecorators.forClass(C)(D, F)
    class SealedDefinitions {}

    assertEquals(SealedDecorators.getSealedClasses(D), [
        SealedDecorators.named(D.name, D)
    ]);
});
