import { IConditionalComparator } from "../types/IConditionalComparator.ts";
import { DiffComparable } from "../types/DiffComparable.ts";
import { Bson } from "mongo/mod.ts";
import { IComparatorContext } from "../types/IComparatorContext.ts";
import { IDiff, Modified } from "../types/IDiff.ts";
import { BeanType } from "../../../didi-commons/lib/types/BeanType.ts";

type MongoEqual = { equals(other: any): boolean };

export class MongoNativeComparator implements IConditionalComparator {
    private static TYPES: BeanType<MongoEqual>[] = [
        Bson.ObjectId,
    ];

    private static isMongoNative(instance: any): boolean {
        return MongoNativeComparator.TYPES.find(type => instance?.constructor === type) !== undefined;
    }

    test(left: DiffComparable, right: DiffComparable): boolean {
        return MongoNativeComparator.isMongoNative(left) || MongoNativeComparator.isMongoNative(right);
    }

    compare(left: DiffComparable, right: DiffComparable, path: string[], ctx: IComparatorContext): IDiff[] {
        return left?.constructor === right?.constructor && (left as MongoEqual).equals(right)
            ? []
            : Modified(left, right, path, this);
    }
}

