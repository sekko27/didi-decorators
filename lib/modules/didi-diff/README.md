# Description

This module implements object differences feature. The following types are supported by default:

```typescript
export type DiffObject = {[k: string]: DiffComparable};
export type DiffComparable = undefined | string | number | null | boolean | Date | DiffObject | DiffComparable[];
```

# Usage

```typescript
const serialization1: DiffComparable = {/* ... */};
const serialization2: DiffComparable = {/* ... */};
const comparator = CompositeComparator.comparator();
console.log(comparator.compare(serialization1, serialization2));
```

The response is a list of **IDiff** elements. Each element describe details:

```typescript
const diff = {
    kind: DiffKind, // Kind of the diff: add, del, mod
    left: DiffComparable, // original value
    right: DiffComparable, // modified value or undefined on removal
    path: string[], // path to the value
}
```

# Hints

1. When array has element deletion (setting element to undefined or the modified array has less element) then we returns the whole object as modification.
