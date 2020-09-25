class A {

    prototype() {
        return "kaka";
    }
}

class B {
    kaka() {
        return "anyad";
    }
}
class C extends B {}

const a = new A();
console.log(a.prototype(), A.prototype.prototype.toString(), C.prototype.__proto__.kaka.toString());

