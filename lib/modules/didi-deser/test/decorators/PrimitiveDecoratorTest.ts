import { oneElement, PrimitiveEquals } from "./DecoratorTestUtil.ts";
import { Primitive } from "../../lib/implementation/primitive/PrimitiveDeSerDecorators.ts";
import { InvalidFieldDeSerDefinitionError } from "../../lib/errors/InvalidFieldDeSerDefinitionError.ts";
import { assertThrows } from "std/testing/asserts.ts";


Deno.test("primitive decorator - it should decorate primitives properly - auto type detection", () => {
    class A { @Primitive() private a: number; }

    PrimitiveEquals(oneElement(A), "a", "a", Number);
});

Deno.test("primitive decorator - date is primitive", () => {
    class A { @Primitive() private d: Date; }

    PrimitiveEquals(oneElement(A), "d", "d", Date);
});

Deno.test("primitive decorator - string is primitive", () => {
    class A { @Primitive() private s: string; }

    PrimitiveEquals(oneElement(A), "s", "s", String);
});

Deno.test("primitive decorator - boolean is primitive", () => {
    class A { @Primitive() private b: boolean; }

    PrimitiveEquals(oneElement(A), "b", "b", Boolean);
});

Deno.test("primitive decorator - it should decorate primitives property - alias", () => {
    class A { @Primitive({alias: "b"}) private a: number; }

    PrimitiveEquals(oneElement(A), "a", "b", Number);
});

Deno.test("primitive decorator - it should throw error on non-primitive type [array]", () => {
    assertThrows(() => {
        class A { @Primitive() private a: any[]; }
    }, InvalidFieldDeSerDefinitionError);
});

Deno.test("primitive decorator - it should throw error on non-primitive type [class]", () => {
    assertThrows(() => {
        class O {}
        class A { @Primitive() private a: O; }
    }, InvalidFieldDeSerDefinitionError);
});
