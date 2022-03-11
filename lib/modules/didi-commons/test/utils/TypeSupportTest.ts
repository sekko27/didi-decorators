import { assertEquals, assertStrictEquals } from "std/testing/asserts.ts";
import { TypeSupport } from "../../lib/utils/TypeSupport.ts";

class A {}
    class B extends A {}
        class C extends B {}
    class E extends A {}
class F {}

Deno.test("SubTypeOf should follow the inheritance chain", () => {

    const isSubType = (subClass: Function, supClass: Function): void => {
        assertStrictEquals(
            TypeSupport.subTypeOf(subClass, supClass), true, `${subClass.name} should be subtype of ${supClass.name}`
        );
        if (supClass !== subClass) {
            notSubType(supClass, subClass);
        }
    }

    const notSubType = (subClass: Function, supClass: Function): void => {
        assertStrictEquals(
            TypeSupport.subTypeOf(subClass, supClass), false, `${subClass.name} shouldn't be subtype of ${supClass.name}`
        );
    }

    isSubType(A, A);
    isSubType(B, A);
    isSubType(E, A);
    isSubType(C, B);
    isSubType(C, A);
    notSubType(A, F);
    notSubType(B, E);
    notSubType(C, E);

})
