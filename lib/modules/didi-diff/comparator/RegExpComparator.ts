import { IConditionalComparator } from "./types/IConditionalComparator.ts";
import { DiffComparable } from "./types/DiffComparable.ts";
import { IDiff, Modified } from "./types/IDiff.ts";
import { IComparatorContext } from "./types/IComparatorContext.ts";

function isRegExp(value: any): value is RegExp {
    return value?.constructor === RegExp;
}

function sameRegExp(r1: RegExp, r2: RegExp): boolean {
    return r1.toString() === r2.toString();
}

export class RegExpComparator implements IConditionalComparator {
    test(left: DiffComparable, right: DiffComparable): boolean {
        return isRegExp(left) || isRegExp(right);
    }

    compare(left: DiffComparable, right: DiffComparable, path: string[], ctx: IComparatorContext): IDiff[] {
        return isRegExp(left) && isRegExp(right) && sameRegExp(left, right) ? [] : Modified(left, right, path, this);
    }
}
