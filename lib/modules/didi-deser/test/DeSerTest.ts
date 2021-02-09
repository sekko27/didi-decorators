import { DeSerDecorators } from "../decorators/DeSerDecorators.ts";
import { Arr, Class, Primitive } from "../definition/package.ts";
import { SealedDecorators } from "../../../decorators/sealed/SealedDecorators.ts";
import { DeSerBuilder } from "../builder/DeSerBuilder.ts";
import { PrimitiveDeSerBuilder } from "../builder/PrimitiveDeSerBuilder.ts";
import { ArrayDeSerBuilder } from "../builder/ArrayDeSerBuilder.ts";
import { ClassDeSerBuilder } from "../builder/ClassDeSerBuilder.ts";
import { OptionalDeSerBuilder } from "../builder/OptionalDeSerBuilder.ts";
import { AutoDeSerBuilder } from "../builder/AutoDeSerBuilder.ts";
import { TransientDeSerBuilder } from "../builder/TransientDeSerBuilder.ts";
import { MixedDeSerBuilder } from "../builder/MixedDeSerBuilder.ts";
import { MongoAutoIdDeSerBuilder } from "../builder/MongoAutoIdDeSerBuilder.ts";
import { CompositeComparator } from "../../didi-diff/comparator/CompositeComparator.ts";
import { CreatedAtDeSerBuilder } from "../builder/CreatedAtDeSerBuilder.ts";

class Base {
    @DeSerDecorators.Optional(Primitive(Number))
    prim0: number;
}

class Embed {
    @DeSerDecorators.Primitive()
    embeddedValue: number;
}

class EmbeddedReally extends Embed {
    constructor(value: number) {
        super();
        this.embeddedValue = value;
    }
}

@SealedDecorators.forClass(Embed)(SealedDecorators.named("really", EmbeddedReally))
class SealedEmbedded {}

class DeSerTest extends Base {
    @DeSerDecorators.AutoId()
    _id: string;

    @DeSerDecorators.Optional(Primitive(String))
    prim: string;

    @DeSerDecorators.Transient()
    temp: boolean;

    @DeSerDecorators.Optional(Arr(Primitive(Number)), {alias: "array"})
    arr: number[];

    @DeSerDecorators.Class()
    embed: Embed;

    @DeSerDecorators.Mixed()
    mixed: any;

    @DeSerDecorators.Array(Class(Embed))
    embeds: Embed[];

    @DeSerDecorators.CreatedAt()
    createdAt?: Date;
}

const ds: DeSerTest = new DeSerTest();
ds._id = "60228bb0dec69f00807765e6";
ds.prim0 = 100;
ds.temp = true;
ds.arr = [1, 2, 3];
ds.embed = new EmbeddedReally(314);
ds.embeds = Array.from({length: 10}, (v, k) => new EmbeddedReally(k));
ds.mixed = {
    a: "b",
    c: {
        d: 2
    }
}

const deserBuilder = new DeSerBuilder([
    new ArrayDeSerBuilder(),
    new PrimitiveDeSerBuilder(),
    new ClassDeSerBuilder(),
    new OptionalDeSerBuilder(),
    new AutoDeSerBuilder(),
    new TransientDeSerBuilder(),
    new MixedDeSerBuilder(),
    new MongoAutoIdDeSerBuilder(),
    new CreatedAtDeSerBuilder()
]);

const deser = deserBuilder.build(Class(DeSerTest));
const serialized1 = deser.serialize(ds);
console.log(serialized1);
Deno.exit();
ds._id = "60228bb0dec69f00807765e7";
ds.embeds[5].embeddedValue = 3.14;
const serialized2 = deser.serialize(ds);


const comparator = CompositeComparator.mongoComparator();
console.log(comparator.compare(serialized1, serialized2));

/*
const deserialized = deser.deserialize(serialized);
console.log(serialized, deserialized, ds, deserialized instanceof DeSerTest);
*/
