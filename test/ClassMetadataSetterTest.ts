import { assertStrictEquals } from "https://deno.land/std@0.63.0/testing/asserts.ts";
import { ClassMetadataSetter } from "../lib/ClassMetadataSetter.ts";

const TEST_METADATA_KEY = "test";
interface A_MD {
    id: number;
}

class A {}

Deno.test("instance should be strict equals factory returns", () => {

    const md = {id: 1};

    assertStrictEquals(new ClassMetadataSetter<A_MD>(TEST_METADATA_KEY, (cls) => md).metadata(A), md);
});

Deno.test("should use factory provided default value", () => {
    const md = {id: 1};
    assertStrictEquals(
        new ClassMetadataSetter<A_MD>(TEST_METADATA_KEY, (cls) => md).metadata(A).id,
        1
    );
});

Deno.test("configured property should be return", () => {
    const md: A_MD = {id: 1};
    assertStrictEquals(
        new ClassMetadataSetter<A_MD>(TEST_METADATA_KEY, (cls) => md)
            .setField(A, "id", 2)
            .metadata(A).id,
        2
    );
})
