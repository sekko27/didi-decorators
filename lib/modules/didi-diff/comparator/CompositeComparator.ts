import { IConditionalComparator } from "./types/IConditionalComparator.ts";
import { DiffComparable } from "./types/DiffComparable.ts";
import { IDiff } from "./types/IDiff.ts";
import { UndefinedComparator } from "./UndefinedComparator.ts";
import { PrimitiveComparator } from "./PrimitiveComparator.ts";
import { DateComparator } from "./DateComparator.ts";
import { ArrayComparator } from "./ArrayComparator.ts";
import { ObjectComparator } from "./ObjectComparator.ts";
import { RegExpComparator } from "./RegExpComparator.ts";
import { NullComparator } from "./NullComparator.ts";

export class CompositeComparator {
    constructor(private readonly comparators: IConditionalComparator[]) {
    }

    compare(left: DiffComparable, right: DiffComparable, path: string[] = []): IDiff[] {
        for (const comparator of this.comparators) {
            if (comparator.test(left, right)) {
                return comparator.compare(left, right, path, this);
            }
        }
        throw new Error(`No matching comparator`);
    }

    test(left: DiffComparable, right: DiffComparable): boolean {
        return true;
    }

    public static comparator() {
        return new CompositeComparator([
            new UndefinedComparator(),
            new NullComparator(),
            new PrimitiveComparator(),
            new ObjectComparator(),
            new ArrayComparator(),
            new DateComparator(),
            new RegExpComparator()
        ]);
    }
}
