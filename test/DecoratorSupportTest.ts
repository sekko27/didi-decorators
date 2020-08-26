import { assertStrictEquals } from "../deps.ts";
import { DecoratorSupport } from "../lib/DecoratorSupport.ts";

const fieldTypes: Map<keyof A, any> = new Map();
const returnTypes: Map<keyof A, any> = new Map();
const paramTypes: Map<keyof A, Map<number, any>> = new Map();
const setterTypes: Map<keyof A, any> = new Map();

function field() {
    return (cls: any, name: keyof A) => {
        fieldTypes.set(name, DecoratorSupport.fieldType(cls, name));
    };
}

function returnValue() {
    return (cls: any, name: keyof A) => {
        returnTypes.set(name, DecoratorSupport.returnType(cls, name));
    }
}

function param() {
    return (cls: any, name: keyof A, index: number) => {
        if (!paramTypes.has(name)) {
            paramTypes.set(name, new Map<number, any>());
        }
        (paramTypes.get(name) as Map<number, any>).set(index, DecoratorSupport.paramType(cls, name, index));
    }
}
function setter() {
    return (cls: any, name: keyof A) => {
        setterTypes.set(name, DecoratorSupport.setterType(cls, name));
    }
}

class B {}

interface IB {}

class A {
    @field()
    numeric: number = 0;

    @field()
    string: string = "";

    @field()
    boolean: boolean = false;

    @field()
    array: any[] = [];

    @field()
    object: any = {};

    @field()
    date: Date = new Date();

    @field()
    custom?: B;

    @field()
    iface?: IB;

    @returnValue()
    r_string(@param() a: string, @param() b: number): string {
        return "";
    }

    @setter()
    set value(value: string) {}
}

Deno.test("field type - number", () => {
    assertStrictEquals(fieldTypes.get("numeric"), Number);
});

Deno.test("field type - string", () => {
    assertStrictEquals(fieldTypes.get("string"), String);
});

Deno.test("field type - boolean", () => {
    assertStrictEquals(fieldTypes.get("boolean"), Boolean);
});

Deno.test("field type - array", () => {
    assertStrictEquals(fieldTypes.get("array"), Array);
});

Deno.test("field type - object (any)", () => {
    assertStrictEquals(fieldTypes.get("object"), Object);
});

Deno.test("field type - date", () => {
    assertStrictEquals(fieldTypes.get("date"), Date);
});

Deno.test("field type - custom", () => {
    assertStrictEquals(fieldTypes.get("custom"), B);
});

Deno.test("field type - interface", () => {
    assertStrictEquals(fieldTypes.get("iface"), Object);
});

Deno.test("return type - string", () => {
    assertStrictEquals(returnTypes.get("r_string"), String);
});

Deno.test("param type - string", () => {
    assertStrictEquals((paramTypes.get("r_string") as Map<number, any>).get(0), String);
});

Deno.test("param type - number", () => {
    assertStrictEquals((paramTypes.get("r_string") as Map<number, any>).get(1), Number);
});

Deno.test("setter type - string", () => {
    assertStrictEquals(setterTypes.get("value"), String);
})

Deno.test("test", () => {
    function p(hint: string) {
        return (cls: any, name: string, descriptor?: TypedPropertyDescriptor<any>): void => {
            // property -> prototype
            // method -> prototype
            // setter -> prototype
            // static property -> constructor
            // class -> constructor
            // static method -> constructor
            console.log(hint, cls.name, cls.prototype, cls.constructor, cls.constructor?.name);
        }
    }

    function c() {
        return (cls: any) => {
            console.log("class", cls.name, cls.prototype, cls.constructor, cls.constructor?.name);
        }
    }

    function par(hint: string) {
        return (cls: any, name: string, index: number) => {
            console.log(hint, cls.name, cls.prototype, cls.constructor, cls.constructor?.name);
        }
    }
    @c()
    class A {
        constructor(@par("constructor param") a: string) {
        }

        @p("prop")
        pp?: number;

        @p("static")
        static sp?: number;

        @p("method")
        hello(@par("method param") a: string): void {}

        @p("static method")
        static hell(@par("static method param") a: string): void {}
    }
});
