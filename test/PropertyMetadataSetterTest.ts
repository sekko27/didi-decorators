import { assertEquals } from "../deps.ts";
import { PropertyMetadataSetter } from "../lib/PropertyMetadataSetter.ts";

interface MD {
    tmp: string;
}
const setter = new PropertyMetadataSetter<MD>("test", () => ({tmp: "undefined"}));

function prop() {
    return (cls: any, property: string) => {
        setter.setField({cls, property}, "tmp", property);
    }
}
class A {
    @prop()
    a?: string;

    @prop()
    static b?: string;
}

Deno.test("annotated properties - instance properties", () => {
    assertEquals(Array.from(PropertyMetadataSetter.annotatedPropertyNamesByConstructor(A)), ["a"]);
});

Deno.test("annotated properties - class properties", () => {
    assertEquals(Array.from(PropertyMetadataSetter.annotatedStaticPropertyNamesByConstructor(A)), ["b"]);
});

Deno.test("annotated properties - it returns static properties by default", () => {
    assertEquals(Array.from(PropertyMetadataSetter.annotatedPropertyNames(A)), ["b"]);
});
