import { assertEquals, assertStrictEquals } from "../../../../../deps.ts";
import { DecoratorSupport } from "../../lib/metadata/DecoratorSupport.ts";

const fieldTypes: Map<keyof A, any> = new Map();
const returnTypes: Map<keyof A, any> = new Map();
const paramTypes: Map<keyof A, Map<number, any>> = new Map();
const paramNames: Map<keyof A, string[] | undefined> = new Map();
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

function names() {
    return (cls: any, name: keyof A) => {
        paramNames.set(name, DecoratorSupport.paramNames(cls, name));
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

    @names()
    @returnValue()
    r_string(@param() a: string, @param() b: number): string {
        return "";
    }

    @names()
    @returnValue()
    r_number(): number {
        return 5;
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

Deno.test("return type - number", () => {
    assertStrictEquals(returnTypes.get("r_number"), Number);
});

Deno.test("param type - string", () => {
    assertStrictEquals((paramTypes.get("r_string") as Map<number, any>).get(0), String);
});

Deno.test("param type - number", () => {
    assertStrictEquals((paramTypes.get("r_string") as Map<number, any>).get(1), Number);
});

Deno.test("setter type - string", () => {
    assertStrictEquals(setterTypes.get("value"), String);
});


Deno.test("param names - with params", () => {
    assertEquals(paramNames.get("r_string"), ["a", "b"]);
});

Deno.test("param names - without params", () => {
   assertEquals(paramNames.get("r_number"), []);
});

