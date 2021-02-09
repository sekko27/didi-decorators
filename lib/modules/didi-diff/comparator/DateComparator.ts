import { IConditionalComparator } from "./types/IConditionalComparator.ts";
import { DiffComparable } from "./types/DiffComparable.ts";
import { IDiff, Modified } from "./types/IDiff.ts";
import { IComparatorContext } from "./types/IComparatorContext.ts";

function isDate(value: any): value is Date {
    return value?.constructor === Date;
}

function sameDate(date1: Date, date2: Date): boolean {
    return date1.getTime() === date2.getTime();
}

export class DateComparator implements IConditionalComparator {
    test(left: DiffComparable, right: DiffComparable): boolean {
        return isDate(left) || isDate(right);
    }

    compare(left: DiffComparable, right: DiffComparable, path: string[], ctx: IComparatorContext): IDiff[] {
        return isDate(left) && isDate(right) && sameDate(left, right) ? [] : Modified(left, right, path, this);
    }
}
