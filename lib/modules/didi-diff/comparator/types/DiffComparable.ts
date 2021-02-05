export type DiffObject = {[k: string]: DiffComparable};
export type DiffComparable = undefined | string | number | null | boolean | Date | DiffObject | DiffComparable[];
