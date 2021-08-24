# Introduction

Sealed classes are for de-serialization able to determine unique set of possible implementations of a type.
So we can serialize the implementation identifier (alias) we can deserialize the serialization back to the proper type.

## Restrictions

1. Sealed classes for a type have unique alias which is the type name by default.
1. Sealed classes for a type have unique type.
1. Sealed classes for a type must be inherited from that type.

# Implementation

## Sealed classes of a type

Sealed classes of a type (**X**) defined by

1. Find the first parent of **X** (including itself) in the prototype chain which is decorated (define sealed classes for that). Let A is the set of defined sealed classes for that.
1. Let B is the set of child classes of the type **X**.
1. Sealed classes of the type **X** will be the intersection of these 2 sets. If this is empty then the result will be the set contains **X** only (default behavior).

## Usage

We need to introduce definition classes for sealed classes:

```typescript
class A {}
class B extends A {}
class C extends A {}

@@SealedDecorators.forClass(A)(B, C)
class A_SealedClassDefinitions {}
```

In this case the aliases will be `["B", "C"]`.

You can use named aliases too:

```typescript
class A {}
class B extends A {}
class C extends A {}

@@SealedDecorators.forClass(A)(SealedDecorators.named("alias", B), C)
class A_SealedClassDefinitions {}
```

In this case the aliases will be `["alias", "C"]`.

> TODO Why do we use function chaining for definition?
