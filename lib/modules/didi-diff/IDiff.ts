import { CompositeComparator } from "./comparator/CompositeComparator.ts";
import { DeSerDecorators } from "../didi-deser/decorators/DeSerDecorators.ts";
import { Optional, Primitive } from "../didi-deser/definition/package.ts";

const a = {
    x1: "lala", // not modified prim
    x2: [1, 2, 3], // not modified array
    x3: 3, // type change
    x4: "mama", // will be papa
    x5: { // nested same
        x51: 1,
        x52: "ketto",
        x53: {
            x531: true
        }
    },
    x6: [1, 2, 3, 4], // [1, "2", 4, 5, 6],
    x7: {
        x71: 1,
        x72: 2,
        x73: 3
    },
    x8: {
        x71: 1,
        x72: 2,
        x73: 3
    },
    x9: [1,2,3,4]
}

const b = {
    x1: "lala",
    x2: [1, 2, 3],
    x3: "3",
    x4: "papa",
    x5: { // nested same
        x51: 1,
        x52: "ketto",
        x53: {
            x531: true
        }
    },
    x6: [1, "2", 4, 5, 6],
    x7: {
        x71: 1 + 1,
        x72: 2 + 1,
        x73: 3 + 1
    },
    x8: {
        x71: 1,
        x72: 2,
    },
    x9: [2,3,4]
};

const comparator = CompositeComparator.comparator();
console.log(comparator.compare(a, b));

