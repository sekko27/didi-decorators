import { DiffKind } from "./DiffKind.ts";
import { DiffComparable } from "./DiffComparable.ts";
import { BeanType } from "../../../didi-commons/lib/types/BeanType.ts";
import { IConditionalComparator } from "./IConditionalComparator.ts";

export interface IDiff {
    kind: DiffKind;
    left?: DiffComparable;
    right?: DiffComparable;
    path: string[];
    comparator: IConditionalComparator;
}

export function Modified(left: DiffComparable, right: DiffComparable, path: string[], comparator: IConditionalComparator): [IDiff] {
    return [{kind: DiffKind.MOD, left, right, path, comparator}];
}

export function Removed(left: DiffComparable, path: string[], comparator: IConditionalComparator): [IDiff] {
    return [{kind: DiffKind.DEL, left, right: undefined, path, comparator}];
}

export function Added(right: DiffComparable, path: string[], comparator: IConditionalComparator): [IDiff] {
    return [{kind: DiffKind.ADD, left: undefined, right, path, comparator}];
}
