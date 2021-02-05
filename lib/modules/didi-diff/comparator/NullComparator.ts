import { IConditionalComparator } from "./types/IConditionalComparator.ts";
import { DiffComparable } from "./types/DiffComparable.ts";
import { IComparatorContext } from "./types/IComparatorContext.ts";
import { Added, IDiff, Modified, Removed } from "./types/IDiff.ts";
import { DiffKind } from "./types/DiffKind.ts";

export class NullComparator implements IConditionalComparator {
    test(left: DiffComparable, right: DiffComparable): boolean {
        return left === null || right === null;
    }

    compare(left: DiffComparable, right: DiffComparable, path: string[], ctx: IComparatorContext): IDiff[] {
        return left === right ? [] : Modified(left, right, path);
    }
}
