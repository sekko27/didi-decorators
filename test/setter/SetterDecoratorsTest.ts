import { assertStrictEquals, assertEquals } from "../../deps.ts";
import { SetterDecorators } from "../../lib/decorators/setter/SetterDecorators.ts";

Deno.test("should resolve type properly", () => {
    class TypeClass {
        @SetterDecorators.Setter()
        set value(value: number) {}
    }

    const all = Array.from(SetterDecorators.all(TypeClass.prototype));
    console.log(all);
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
    
    assertEquals(Array.from(SetterDecorators.all(SortClass.prototype)).map(i => i.id), ["v2", "v1"]);
});
