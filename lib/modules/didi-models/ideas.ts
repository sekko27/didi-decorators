import { TypeSupport } from "../didi-commons/TypeSupport.ts";

class Base {
    e: number = 5;
}

class A extends Base {
    private _c: number;
    public readonly b: number;

    constructor(private readonly a: number) {
        super();
    }

    get c(): number {
        return this._c;
    }

    set c(value: number) {
        this._c = value * 2;
    }
}

const state = {_c: 2, b: 3, a: 4};

// deser
const instance0 = Object.create(A.prototype);
Object.assign(instance0, state);
instance0.constructor = A;

// hand-made
const instance = new A(6);
instance.c = 4;

const names = [];
let ix = 0;
for (let current = instance; current.constructor !== Object; current = Object.getPrototypeOf(current)) {
    console.log(ix++, current);
    console.log(Object.getOwnPropertyDescriptors(current));
    names.push(...Array.from(Object.entries(Object.getOwnPropertyDescriptors(current))).filter(([name, pd]) => pd.get === undefined && pd.set === undefined && name !== "constructor").map(([name]) => name));
    // names.push(...(Object.getOwnPropertyNames(current) ?? []));
}

const serState = names.reduce((memo, name) => {
    return {...memo, [name]: (instance as any)[name]};
}, {});

console.log(names, instance instanceof A, TypeSupport.subTypeOf(instance.constructor, A), instance, Object.getOwnPropertyNames(instance), serState);

// deser again
const instance2 = Object.create(A.prototype);
Object.assign(instance2, serState);
instance0.constructor = A;

console.log(instance2);
