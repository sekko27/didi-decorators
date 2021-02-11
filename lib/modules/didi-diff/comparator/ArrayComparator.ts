import { IConditionalComparator } from "./types/IConditionalComparator.ts";
import { DiffComparable } from "./types/DiffComparable.ts";
import { IComparatorContext } from "./types/IComparatorContext.ts";
import { IDiff, Modified, Removed } from "./types/IDiff.ts";
import { DiffKind } from "./types/DiffKind.ts";
import { DiffCollection } from "./DiffCollection.ts";
import {
    ArrayElementKeyValueProvider,
    DeSerArrayUtil
} from "../../didi-deser/lib/implementation/base/DeSerArrayUtil.ts";

export class ArrayComparator implements IConditionalComparator {
    test(left: DiffComparable, right: DiffComparable): boolean {
        return Array.isArray(left) || Array.isArray(right);
    }

    compare(left: DiffComparable, right: DiffComparable, path: string[], ctx: IComparatorContext): IDiff[] {
        if (!Array.isArray(left) || !Array.isArray(right)) {
            return Modified(left, right, path, this);
        }

        const leftKeyValueProviders = DeSerArrayUtil.getKeyValueProviderForUnorderedArray(left)
        const rightKeyValueProviders = DeSerArrayUtil.getKeyValueProviderForUnorderedArray(right);
        if (leftKeyValueProviders !== undefined || rightKeyValueProviders !== undefined) {
            return this.compareUnOrdered(
                (leftKeyValueProviders ?? rightKeyValueProviders) as ArrayElementKeyValueProvider,
                left, right, path, ctx
            );
        } else {
            return this.compareOrdered(left, right, path, ctx);
        }
    }

    compareOrdered(left: any[], right: any[], path: string[], ctx: IComparatorContext): IDiff[] {
        const maxLength = left.length >= right.length ? left.length : right.length;
        if (maxLength === 0) {
            return [];
        }

        const diffCollection = new DiffCollection();
        for (let ix = 0; ix < maxLength; ix++) {
            const lav = ix >= maxLength ? undefined : left[ix];
            const rav = ix >= maxLength ? undefined : right[ix];
            const nextPath = path.concat([String(ix)]);
            const elementDiffs = ctx.compare(lav, rav, nextPath);
            diffCollection.applyResult(elementDiffs);
        }
        return diffCollection.hasRemoved ? Modified(left, right, path, this) : diffCollection.summarize(left, right, path, this);
    }

    compareUnOrdered(keyValueProviders: ArrayElementKeyValueProvider, left: any[], right: any[], path: string[], ctx: IComparatorContext): IDiff[] {
        const leftMapped = ArrayComparator.resolveKeyValue(left, keyValueProviders);
        const rightMapped = ArrayComparator.resolveKeyValue(right, keyValueProviders);
        if (leftMapped.length !== rightMapped.length) {
            console.log("anyad length");
            return Modified(left, right, path, this);
        }
        for (const [leftKey, leftValue] of leftMapped) {
            const match = ArrayComparator.findByElementKey(leftKey, rightMapped, ctx);
            const nextPath = path.concat([JSON.stringify(leftKey)]);
            if (match === undefined) {
                console.log("anyad removed", leftKey, leftMapped, rightMapped);
                return Modified(left, right, path, this);
            } else if (ctx.compare(leftValue, match, nextPath).length > 0) {
                console.log("anyad modified", leftKey);
                return Modified(left, right, path, this);
            }
        }
        return [];
    }

    private static resolveKeyValue(array: any[], keyValueProvider: ArrayElementKeyValueProvider): [any, any][] {
        return array.map(elem => [keyValueProvider.key(elem), keyValueProvider.value(elem)]);
    }

    private static findByElementKey(needleKey: any, haystack: [any, any][], ctx: IComparatorContext): [any, number] | undefined {
        const result = haystack.find(([key]) => ctx.compare(needleKey, key).length === 0);
        return result?.[1];
    }
}
