import { IConditionalComparator } from "./types/IConditionalComparator.ts";
import { DiffComparable } from "./types/DiffComparable.ts";
import { IComparatorContext } from "./types/IComparatorContext.ts";
import { Added, IDiff, Modified } from "./types/IDiff.ts";
import { DiffCollection } from "./DiffCollection.ts";

function isObject(value: any): value is Object {
    return value?.constructor === Object;
}

export class ObjectComparator implements IConditionalComparator {
    test(left: DiffComparable, right: DiffComparable): boolean {
        return isObject(left) || isObject(right);
    }

    compare(left: DiffComparable, right: DiffComparable, path: string[], ctx: IComparatorContext): IDiff[] {
        if (!isObject(left) || !isObject(right)) {
            return Modified(left, right, path, this);
        }
        const diffCollection = new DiffCollection();
        const keys: Set<string> = new Set(Object.keys(left));
        for (const [key, value] of Object.entries(left)) {
            const nextPath = path.concat([key]);
            const entryDiffs = ctx.compare(value, right.hasOwnProperty(key) ? (right as any)[key] : undefined, nextPath);
            diffCollection.applyResult(entryDiffs);
        }
        for (const [key, value] of Object.entries(right)) {
            if (!keys.has(key)) {
                diffCollection.applyResult(Added(value, path.concat([key]), this));
            }
        }
        return diffCollection.summarize(left, right, path, this);
    }
}
