import { SealedDecorators } from "../../../decorators/sealed/SealedDecorators.ts";
import { DeSerBuilder } from "../lib/implementation/base/DeSerBuilder.ts";
import { PrimitiveDeSerBuilder } from "../lib/implementation/primitive/PrimitiveDeSerBuilder.ts";
import { ArrayDeSerBuilder } from "../lib/implementation/array/ArrayDeSerBuilder.ts";
import { EmbeddedDeSerBuilder } from "../lib/implementation/embedded/EmbeddedDeSerBuilder.ts";
import { OptionalDeSerBuilder } from "../lib/implementation/optional/OptionalDeSerBuilder.ts";
import { AutoDeSerBuilder } from "../lib/implementation/auto/AutoDeSerBuilder.ts";
import { TransientDeSerBuilder } from "../lib/implementation/transient/TransientDeSerBuilder.ts";
import { MixedDeSerBuilder } from "../lib/implementation/mixed/MixedDeSerBuilder.ts";
import { MongoAutoIdDeSerBuilder } from "../builder/MongoAutoIdDeSerBuilder.ts";
import { CompositeComparator } from "../../didi-diff/comparator/CompositeComparator.ts";
import { CreatedAtDeSerBuilder } from "../lib/implementation/createdAt/CreatedAtDeSerBuilder.ts";
import { AutoId } from "../lib/implementation/autoId/AutoIdDeSerDecorators.ts";
import { Optional } from "../lib/implementation/optional/OptionalDeSerDecorators.ts";
import { Transient } from "../lib/implementation/transient/TransientDeSerDecorators.ts";
import { CreatedAt } from "../lib/implementation/createdAt/CreatedAtDeSerDecorators.ts";
import { Mixed } from "../lib/implementation/mixed/MixedDeSerDecorators.ts";
import { Embedded, EmbeddedDef } from "../lib/implementation/embedded/EmbeddedDeSerDecorators.ts";
import { Arr, ArrDef } from "../lib/implementation/array/ArrayDeSerDecorators.ts";
import { Primitive, PrimitiveDef } from "../lib/implementation/primitive/PrimitiveDeSerDecorators.ts";
import { MapDeSerBuilder } from "../lib/implementation/map/MapDeSerBuilder.ts";
import { MapCollection, MapDef } from "../lib/implementation/map/MapDeSerDecorators.ts";
import { DeSerDecorators } from "../lib/implementation/base/DeSerDecorators.ts";
import { SetDeSerBuilder } from "../lib/implementation/set/SetDeSerBuilder.ts";
import { SetCollection } from "../lib/implementation/set/SetDeSerDecorators.ts";

class Base {
    @Optional(PrimitiveDef(Number))
    prim0: number;
}

class Embed {
    @Primitive()
    embeddedValue: number;
}

class EmbeddedReally extends Embed {
    constructor(value: number) {
        super();
        this.embeddedValue = value;
    }
}

class EmbeddedHard extends Embed {
    @Primitive()
    stringValue: string;

    constructor(value: number) {
        super();
        this.embeddedValue = value;
        this.stringValue = value.toString(2);
    }
}

@SealedDecorators.forClass(Embed)(
    SealedDecorators.named("really", EmbeddedReally),
    SealedDecorators.named("hard", EmbeddedHard),
)
class SealedEmbedded {}

class DeSerTest extends Base {
    @AutoId()
    _id: string;

    @Optional(PrimitiveDef(String))
    prim: string;

    @Transient()
    temp: boolean;

    @Optional(ArrDef(PrimitiveDef(Number)), {alias: "array"})
    arr: number[];

    @Embedded()
    embed: Embed;

    @Mixed()
    mixed: any;

    @Arr(EmbeddedDef(Embed))
    embeds: Embed[];

    @CreatedAt()
    createdAt?: Date;

    @MapCollection(PrimitiveDef(String), EmbeddedDef(Embed))
    map: Map<String, Embed>;

    @SetCollection(EmbeddedDef(Embed))
    set: Set<Embed>;
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
ds.map = new Map([
    ["k1", new EmbeddedReally(1)],
    ["k2", new EmbeddedHard(2)]
]);
ds.set = new Set([
    new EmbeddedReally(1),
    new EmbeddedHard(3)
]);

const deserBuilder = new DeSerBuilder([
    new ArrayDeSerBuilder(),
    new PrimitiveDeSerBuilder(),
    new EmbeddedDeSerBuilder(),
    new OptionalDeSerBuilder(),
    new AutoDeSerBuilder(),
    new TransientDeSerBuilder(),
    new MixedDeSerBuilder(),
    new MongoAutoIdDeSerBuilder(),
    new CreatedAtDeSerBuilder(),
    new MapDeSerBuilder(),
    new SetDeSerBuilder(),
]);

const deser = deserBuilder.build(EmbeddedDef(DeSerTest));
const serialized1 = deser.serialize(ds);
const deserialized1 = deser.deserialize(serialized1);
const deserialized2: DeSerTest = deser.deserialize(serialized1);
// (deserialized2.map.get("k1") as any).embeddedValue = 3.14;
deserialized2.set.add(new EmbeddedHard(3));
console.log(serialized1, deserialized1);
const comp1 = CompositeComparator.mongoComparator();
console.log(comp1.compare(serialized1, deser.serialize(deserialized2)));
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
