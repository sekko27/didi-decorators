import { SealedDecorators } from "../SealedDecorators.ts";

export class A {

}

export class B extends A {

}

export class C extends A {

}

export class D extends B {

}

@SealedDecorators.forClass(A)(B, SealedDecorators.named("cica", C), D)
class SealedA {

}
