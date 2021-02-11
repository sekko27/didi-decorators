import { assertEquals } from "../../../../../deps.ts";
import { ArrayUtil } from "../../lib/utils/ArrayUtil.ts";

type Elem = {id: number, name: string};

function elem(id: number, name: string): Elem {
    return {id, name};
}

const [E1, E2, E3, E4, E5] = [1,2,3,4,5].map(id => elem(id, `number ${id}`));
const [ME1, ME2, ME3, ME4, ME5] = [1,2,3,4,5].map(id => elem(id, `modified ${id}`));
const [DM4] = [4].map(id => elem(id, `very modified ${id}`));

function eq(_1: Elem, _2: Elem): boolean {
    return _1.id === _2.id;
}

Deno.test("ArrayUtil - first win concat reducer by levels - no conflict", () => {
    const arrays = [
        [E1],
        [E2, E3],
        [E4, E5]
    ];
    assertEquals(arrays.reduce(ArrayUtil.concatReducerOnlyFirstByLevels<Elem>(eq), []), [E1, E2, E3, E4, E5]);
});

Deno.test("ArrayUtil - first win concat reducer by levels - conflict", () => {
    const arrays = [
        [ME1],
        [E1, ME2, E3],
        [E4, E2, ME4]
    ];
    assertEquals(arrays.reduce(ArrayUtil.concatReducerOnlyFirstByLevels<Elem>(eq), []), [ME1, ME2, E3, E4, ME4]);
});

Deno.test("ArrayUtil - first win concat reducer by levels - conflict", () => {
    const arrays = [
        [ME1, E4, ME4],
        [E1, ME2, E3],
        [DM4]
    ];
    assertEquals(arrays.reduce(ArrayUtil.concatReducerOnlyFirstByLevels<Elem>(eq), []), [ME1, E4, ME4, ME2, E3]);
});

Deno.test("ArrayUtil - last win concat reducer by levels - no conflict", () => {
    const arrays = [
        [E1],
        [E2, E3],
        [E4, E5]
    ];
    assertEquals(arrays.reduce(ArrayUtil.concatReducerOnlyLastByLevels<Elem>(eq), []), [E1, E2, E3, E4, E5]);
});

Deno.test("ArrayUtil - last win concat reducer by levels - conflict", () => {
    const arrays = [
        [ME1],
        [E1, ME2, E3],
        [E4, E2, ME4]
    ];
    assertEquals(arrays.reduce(ArrayUtil.concatReducerOnlyLastByLevels<Elem>(eq), []), [E1, E3, E4, E2, ME4]);
});
