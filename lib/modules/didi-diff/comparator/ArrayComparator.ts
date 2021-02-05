import { IConditionalComparator } from "./types/IConditionalComparator.ts";
import { DiffComparable } from "./types/DiffComparable.ts";
import { IComparatorContext } from "./types/IComparatorContext.ts";
import { IDiff, Modified } from "./types/IDiff.ts";
import { DiffKind } from "./types/DiffKind.ts";
import { DiffCollection } from "./DiffCollection.ts";

export class ArrayComparator implements IConditionalComparator {
    test(left: DiffComparable, right: DiffComparable): boolean {
        return Array.isArray(left) || Array.isArray(right);
    }

    compare(left: DiffComparable, right: DiffComparable, path: string[], ctx: IComparatorContext): IDiff[] {
        if (!Array.isArray(left) || !Array.isArray(right)) {
            return Modified(left, right, path);
        }
        const maxLength = left.length >= right.length ? left.length : right.length;
        if (maxLength === 0) {
            return [];
        }

        const diffCollection = new DiffCollection();
        for (let ix = 0; ix < maxLength; ix++) {
            const lav = ix >= maxLength ? undefined : left[ix];
            const rav = ix >= maxLength ? undefined : right[ix];
            const nextPath = path.concat([String(ix)]);
            const elementDiffs = ctx.compare(lav, rav, nextPath);
            diffCollection.applyResult(elementDiffs);
        }
        return diffCollection.hasRemoved ? Modified(left, right, path) : diffCollection.summarize(left, right, path);
    }
}
