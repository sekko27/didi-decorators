import { DiffKind } from "./DiffKind.ts";
import { DiffComparable } from "./DiffComparable.ts";

export interface IDiff {
    kind: DiffKind;
    left?: DiffComparable;
    right?: DiffComparable;
    path: string[];
}

export function Modified(left: DiffComparable, right: DiffComparable, path: string[]): [IDiff] {
    return [{kind: DiffKind.MOD, left, right, path}];
}

export function Removed(left: DiffComparable, path: string[]): [IDiff] {
    return [{kind: DiffKind.DEL, left, right: undefined, path}];
}

export function Added(right: DiffComparable, path: string[]): [IDiff] {
    return [{kind: DiffKind.ADD, left: undefined, right, path}];
}
