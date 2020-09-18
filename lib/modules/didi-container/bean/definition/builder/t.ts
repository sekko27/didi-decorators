class A {
    method(param: string): number {
        return 2;
    }
}

class C<T> {
    qualify(name: keyof T): void {}
}

const c = new C<A>();
c.qualify("method")
