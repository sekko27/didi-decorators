# Partial deser

We need implementation for partial deserialization for mongo:

1. For objects we should check state and do not serialize non-modified properties. If there is an unmodified properties
then we should linearize the path set for `$set` operator. It should be done recursively.
1. Same for arrays:

