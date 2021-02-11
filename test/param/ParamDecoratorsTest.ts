import { assertEquals, assertThrows } from "../../deps.ts";

import { ParamDecorators } from "../../lib/decorators/param/ParamDecorators.ts";
import { MissingParameterDecorationError } from "../../lib/decorators/param/MissingParameterDecorationError.ts";
import { StringifyParamDecoratorMetadata } from "../../lib/decorators/param/IParamDecoratorMetadata.ts";

Deno.test("paramName is the name of the param by default", () => {
    class ParamNameUndefinedByDefault {
        method(@ParamDecorators.Inject() param: string) {}
    }

    assertEquals(
        ParamDecorators.methodParams(ParamNameUndefinedByDefault, "method")
            .map(p => p.paramName),
        ["param"],
    );
});

Deno.test("constructor paramName is the name of the param by default", () => {
    class ParamNameUndefinedByDefault {
        constructor(@ParamDecorators.Inject() param: string) {}
    }

    assertEquals(
        ParamDecorators.constructorParams(ParamNameUndefinedByDefault).map(p => p.paramName), ["param"]);
});

Deno.test("paramName is configurable", () => {
    class ParamNameIsConfigurable {
        method(@ParamDecorators.Inject("x") param: string) {}
    }

    assertEquals(
        ParamDecorators.methodParams(ParamNameIsConfigurable, "method")
            .map(p => p.paramName),
        ["x"],
    );
});

Deno.test("constructor paramName is configurable", () => {
    class ParamNameIsConfigurable {
        constructor(@ParamDecorators.Inject("x") param: string) {}
    }

    assertEquals(
        ParamDecorators.constructorParams(ParamNameIsConfigurable).map(p => p.paramName), ["x"]);
});

Deno.test("resolution resolve non-annotated params too", () => {
    class NonAnnotatedParamResolution {
        method(@ParamDecorators.Inject() p1: string, p2: number) {}
    }

    assertEquals(
        ParamDecorators.methodParams(NonAnnotatedParamResolution, "method")
            .map(p => p.paramName),
        ["p1", "p2"],
    );
});

Deno.test("constructor resolution resolve non-annotated params too", () => {
    class NonAnnotatedParamResolution {
        constructor(@ParamDecorators.Inject() p1: string, p2: number) {}
    }

    assertEquals(
        ParamDecorators.constructorParams(NonAnnotatedParamResolution)
            .map(p => p.paramName),
        ["p1", "p2"],
    );
});

Deno.test("should throw error on non-decorated params at all", () => {
    assertThrows(() => {
        class NonDecoratedAtAll {
            method(p1: string, p2: number) {}
        }

        ParamDecorators.methodParams(NonDecoratedAtAll, "method");
    }, MissingParameterDecorationError);
});

Deno.test("constructor should throw error on non-decorated params at all", () => {
    assertThrows(() => {
        class NonDecoratedAtAll {
            constructor(p1: string, p2: number) {}
        }

        ParamDecorators.constructorParams(NonDecoratedAtAll);
    }, MissingParameterDecorationError);
});

Deno.test("should not throw error on method annotated but no param annotated case", () => {
    class MethodDecorated {
        @ParamDecorators.Method()
        method(p1: string) {}
    }

    assertEquals(
        ParamDecorators.methodParams(MethodDecorated, "method").map(p => p.paramName),
        ["p1"]
    );
});

Deno.test("method param formatter test - should not throw error", () => {
    class A {
        method(@ParamDecorators.Inject() x: number) {}
    }

    const result = ParamDecorators.methodParams(A, "method").map(StringifyParamDecoratorMetadata).join(",");
});

Deno.test("constructor param formatter test - should not throw error", () => {
    class A {
        constructor(@ParamDecorators.Inject() x: number) {}
    }

    const result = ParamDecorators.constructorParams(A).map(StringifyParamDecoratorMetadata).join(",");
    console.log(result);
});
