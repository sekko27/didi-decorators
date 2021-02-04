import { DeSerDecorators } from "../decorators/DeSerDecorators.ts";
import { Arr, Class, Primitive } from "../definition/package.ts";
import { DefaultDeSerBuilder } from "../builder/default/DefaultDeSerBuilder.ts";
import { DefaultDeSerBuilderContext } from "../builder/default/DefaultDeSerBuilderContext.ts";
import { TypeSupport } from "../../didi-commons/TypeSupport.ts";
import { SealedDecorators } from "../../../decorators/sealed/SealedDecorators.ts";

class Base {
    @DeSerDecorators.Optional(Primitive(Number))
    prim0: number;
}

class Embed {
    @DeSerDecorators.Primitive()
    embeddedValue: number;
}

class EmbeddedReally extends Embed {

}

@SealedDecorators.forClass(Embed)(SealedDecorators.named("really", EmbeddedReally))
class SealedEmbedded {}

class DeSerTest extends Base {
    @DeSerDecorators.Optional(Primitive(String))
    prim: string;

    @DeSerDecorators.Transient()
    temp: boolean;

    @DeSerDecorators.Optional(Arr(Primitive(Number)), {alias: "array"})
    arr: number[];

    @DeSerDecorators.Class()
    embed: Embed;
}

const ds: DeSerTest = new DeSerTest();
ds.prim0 = 100;
ds.temp = true;
// ds.arr = [1, 2, 3];
ds.embed = new EmbeddedReally();
ds.embed.embeddedValue = 314;


const deser = new DefaultDeSerBuilder().Class(Class(DeSerTest), new DefaultDeSerBuilderContext());
const serialized = deser.serialize(ds)
const deserialized = deser.deserialize(serialized);
console.log(serialized, deserialized, ds, deserialized instanceof DeSerTest);