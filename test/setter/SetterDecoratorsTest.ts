import { assertStrictEquals, assertEquals } from "../../deps.ts";
import { PropertyDecorators } from "../../lib/property/PropertyDecorators.ts";
import { SetterDecorators } from "../../lib/setter/SetterDecorators.ts";
import { ParamDecorators } from "../../lib/param/ParamDecorators.ts";
import { ITagsPredicate } from "../../lib/modules/didi-tags/types/ITagsPredicate.ts";
import { Tags } from "../../lib/modules/didi-tags/types/Tags.ts";

Deno.test("should resolve type properly", () => {
    class TypeClass {
        @SetterDecorators.Setter()
        set value(value: number) {}
    }

    const all = Array.from(SetterDecorators.all(TypeClass.prototype));
    assertStrictEquals(all.length, 1);
    assertStrictEquals(all[0].type, Number);
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

Deno.test("should support tags", () => {
    const tags: ITagsPredicate = {
        stringify(): string {
            return "test";
        },
        test(value: Tags): boolean {
            return true;
        }
    }
    class TagClass {
        @SetterDecorators.Setter()
        set value(@ParamDecorators.Query(tags) value: number) {}
    }

    assertEquals(Array.from(SetterDecorators.all(TagClass.prototype))[0].tags.stringify(), "test");
});

