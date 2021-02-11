import { assertEquals } from "../../../../../deps.ts";
import { MapUtil } from "../../lib/utils/MapUtil.ts";

Deno.test("first win reducer - has conflict", () => {
    const m1: Map<string, number> = new Map([["one", 1], ["two", 2], ["three", 3]]);
    const m2: Map<string, number> = new Map([["four", 4], ["one", -1]]);
    assertEquals([m1, m2].reduce(MapUtil.firstWinReducer, new Map()), new Map([["one", 1], ["two", 2], ["three", 3], ["four", 4]]));
});
