import { DiffComparable } from "./DiffComparable.ts";
import { IDiff } from "./IDiff.ts";

export interface IComparatorContext {
    compare(left: DiffComparable, right: DiffComparable, path?: string[]): IDiff[];
}
