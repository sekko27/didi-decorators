import { IConditionalComparator } from "./types/IConditionalComparator.ts";
import { TypeSupport } from "../../didi-commons/TypeSupport.ts";
import { DiffComparable } from "./types/DiffComparable.ts";
import { DiffKind } from "./types/DiffKind.ts";
import { IDiff, Modified } from "./types/IDiff.ts";
import { IComparatorContext } from "./types/IComparatorContext.ts";

export class PrimitiveComparator implements IConditionalComparator {
    test(left: DiffComparable, right: DiffComparable): boolean {
        return TypeSupport.isPrimitiveValue(left) || TypeSupport.isPrimitiveValue(right);
    }

    compare(left: DiffComparable, right: DiffComparable, path: string[], ctx: IComparatorContext): IDiff[] {
        return left === right ? [] : Modified(left, right, path, this);
    }


}
