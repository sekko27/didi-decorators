import {ClassMetadataSetter} from "../../lib/metadata/ClassMetadataSetter.ts";
import { assertEquals, assertStrictEquals } from "../../../../../deps.ts";


const METADATA_KEY = "metadataKey";
interface A_MD {
    id: number;
}

Deno.test("instance should be strict equals to that the deserializer returns", () => {
    class A {}
    const md = {id: 1};
    assertStrictEquals(new ClassMetadataSetter<A_MD>(METADATA_KEY, () => md).ownMetadata(A), md);
})


Deno.test("configured property should be return", () => {
    class A {}
    const md = {id: 1}
    assertStrictEquals(
        new ClassMetadataSetter<A_MD>(METADATA_KEY, () => md).setField(A, "id", 2).ownMetadata(A).id,
        2
    );
})

Deno.test("metadata reducer should iterate over the chain of inheritance", () => {

    class A {}
        class B extends A {}
            class D extends B {}
        class C extends A {}

    interface C_MD {
        cls: string;
    }

    const setter = new ClassMetadataSetter<C_MD>(METADATA_KEY, () => {
        return {cls: ""};
    });

    setter.setField(A.prototype, "cls", "A");
    setter.setField(B.prototype, "cls", "B");
    setter.setField(C.prototype, "cls", "C");
    setter.setField(D.prototype, "cls", "D");

    const concatAll = (memo: C_MD[], current: C_MD[]) => {
        return memo.concat(current);
    };

    assertEquals(
        new ClassMetadataSetter<C_MD[]>(METADATA_KEY, () => []).metadata(A.prototype, concatAll, []),
        [{cls: "A"}]
    );

    assertEquals(
        new ClassMetadataSetter<C_MD[]>(METADATA_KEY, () => []).metadata(B.prototype, concatAll, []),
        [{cls: "B"}, {cls: "A"}]
    )

    assertEquals(
        new ClassMetadataSetter<C_MD[]>(METADATA_KEY, () => []).metadata(C.prototype, concatAll, []),
        [{cls: "C"}, {cls: "A"}]
    );

    assertEquals(
        new ClassMetadataSetter<C_MD[]>(METADATA_KEY, () => []).metadata(D.prototype, concatAll, []),
        [{cls: "D"}, {cls: "B"}, {cls: "A"}]
    );


})





