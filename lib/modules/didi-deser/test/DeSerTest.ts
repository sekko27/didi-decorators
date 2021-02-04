import { DeSerDecorators } from "../decorators/DeSerDecorators.ts";
import { Primitive } from "../definition/package.ts";

class Base {
    @DeSerDecorators.Primitive()
    private prim0: number;
}

class DeSerTest extends Base {
    @DeSerDecorators.Primitive()
    private prim: string;

    @DeSerDecorators.Transient()
    private temp: boolean;

    @DeSerDecorators.Array(Primitive(Number), {alias: "array"})
    private arr: number[];
}

console.log(DeSerDecorators.all(DeSerTest));
