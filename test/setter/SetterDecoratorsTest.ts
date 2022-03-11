import { assertStrictEquals, assertEquals } from "std/testing/asserts.ts";
import { SetterDecorators } from "../../lib/decorators/setter/SetterDecorators.ts";

Deno.test("should resolve type properly", () => {
    class TypeClass {
        @SetterDecorators.Setter()
        set value(value: number) {}
    }

    const all = Array.from(SetterDecorators.all(TypeClass));
    assertStrictEquals(all.length, 1);
    assertStrictEquals(all[0].query.type, Number);
});

Deno.test("should sort by dependencies", () => {
    class SortClass {
        @SetterDecorators.Setter(p => p.after("v2"))
        set v1(value: number) {}
        
        @SetterDecorators.Setter()
        set v2(value: number) {}
    }
    
    assertEquals(Array.from(SetterDecorators.all(SortClass)).map(i => i.id), ["v2", "v1"]);
});
