import { SealedDecorators } from "../SealedDecorators.ts";
import { A, B, C, D } from "./A.ts";

class E {}

console.log(SealedDecorators.getSealedClasses(A));
console.log(SealedDecorators.getSealedClasses(B));
console.log(SealedDecorators.getSealedClasses(E));
console.log(SealedDecorators.getSealedClasses(C));

