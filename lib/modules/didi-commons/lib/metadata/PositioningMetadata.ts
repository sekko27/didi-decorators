import { IEntity } from "../types/IEntity.ts";
import { Metadata } from "./Metadata.ts";
import { PositionSupport } from "../../../../../deps.ts";

export class PositioningMetadata<T extends IEntity> extends Metadata<PositionSupport<T>> {
    constructor(key: string) {
        super(key, () => new PositionSupport());
    }

    public sort(ctr: any): IterableIterator<T> {
        return this._sort(ctr)[Symbol.iterator]();
    }

    public mapSort<D>(target: any, mapper: (e: T) => D): IterableIterator<D> {
        return this._sort(target).map(mapper)[Symbol.iterator]();
    }

    private _sort(target: any): T[] {
        return this.constructorMetadata(target, PositionSupport.concatReducer, new PositionSupport()).sort();
    }

    public add(target: any, elem: T, positioning?: (position: PositionSupport<T>) => void) {
        const current = this.ownMetadata(target).elem(elem);
        positioning?.(current);
    }

}
