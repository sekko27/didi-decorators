export interface IBeanFactoryClass<T> {
    create: (...args: any[]) => Promise<T>;
}

class B {}

class A {
    constructor(@Inject("bb")  lala: B, @Param("cp1") clientParam: number) {}
}

container.instanceOf(A)
    .param("cp1", 1)
    .filter("bb", name("kakalaki"));

