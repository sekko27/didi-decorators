import { IDiff, Modified } from "./types/IDiff.ts";
import { DiffComparable } from "./types/DiffComparable.ts";
import { DiffKind } from "./types/DiffKind.ts";

export class DiffCollection {
    private diffs: IDiff[] = [];
    private hasUnmodified: boolean = false;
    private hasModified: boolean = false;

    applyResult(diffs: IDiff[]): void {
        this.hasUnmodified = this.hasUnmodified || diffs.length === 0;
        this.hasModified = this.hasModified || diffs.length > 0;
        this.diffs.push(...diffs);
    }

    public get hasRemoved(): boolean {
        return this.diffs.find(d => d.kind === DiffKind.DEL) !== undefined;
    }

    public summarize(left: DiffComparable, right: DiffComparable, path: string[]): IDiff[] {
        if (this.hasModified) {
            if (!this.hasUnmodified) {
                return Modified(left, right, path);
            } else {
                return this.diffs;
            }
        } else {
            return [];
        }
    }

}
