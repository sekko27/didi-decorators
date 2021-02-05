import { IConditionalComparator } from "./types/IConditionalComparator.ts";
import { DiffComparable } from "./types/DiffComparable.ts";
import { IComparatorContext } from "./types/IComparatorContext.ts";
import { Added, IDiff, Removed } from "./types/IDiff.ts";
import { DiffKind } from "./types/DiffKind.ts";

export class UndefinedComparator implements IConditionalComparator {
    test(left: DiffComparable, right: DiffComparable): boolean {
        return left === undefined || right === undefined;
    }

    compare(left: DiffComparable, right: DiffComparable, path: string[], ctx: IComparatorContext): IDiff[] {
        if (left === undefined) {
            return right === undefined ? [] : Added(right, path);
        } else {
            return Removed(left, path);
        }
    }
}
