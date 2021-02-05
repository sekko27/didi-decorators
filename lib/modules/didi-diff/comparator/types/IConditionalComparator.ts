import { DiffComparable } from "./DiffComparable.ts";
import { IComparatorContext } from "./IComparatorContext.ts";
import { IDiff } from "./IDiff.ts";

export interface IConditionalComparator {
    compare(left: DiffComparable, right: DiffComparable, path: string[], ctx: IComparatorContext): IDiff[];
    test(left: DiffComparable, right: DiffComparable): boolean;
}
