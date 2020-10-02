import { assertEquals, assertThrows } from "../../deps.ts";

import { ParamDecorators } from "../../lib/decorators/param/ParamDecorators.ts";
import { MissingParameterDecorationError } from "../../lib/decorators/param/MissingParameterDecorationError.ts";

Deno.test("paramName is the name of the param by default", () => {
    class ParamNameUndefinedByDefault {
        method(@ParamDecorators.Inject() param: string) {}
    }

    assertEquals(
        ParamDecorators.methodParams(ParamNameUndefinedByDefault.prototype, "method")
            .map(p => p.paramName),
        ["param"],
    );
});

Deno.test("paramName is configurable", () => {
    class ParamNameIsConfigurable {
        method(@ParamDecorators.Inject("x") param: string) {}
    }

    assertEquals(
        ParamDecorators.methodParams(ParamNameIsConfigurable.prototype, "method")
            .map(p => p.paramName),
        ["x"],
    );
});

Deno.test("resolution resolve non-annotated params too", () => {
    class NonAnnotatedParamResolution {
        method(@ParamDecorators.Inject() p1: string, p2: number) {}
    }

    assertEquals(
        ParamDecorators.methodParams(NonAnnotatedParamResolution.prototype, "method")
            .map(p => p.paramName),
        ["p1", "p2"],
    );
});

Deno.test("should throw error on non-decorated params at all", () => {
    assertThrows(() => {
        class NonDecoratedAtAll {
            method(p1: string, p2: number) {}
        }

        ParamDecorators.methodParams(NonDecoratedAtAll.prototype, "method");
    }, MissingParameterDecorationError);
});

Deno.test("should not throw error on method annotated but no param annotated case", () => {
    class MethodDecorated {
        @ParamDecorators.Method()
        method(p1: string) {}
    }

    assertEquals(
        ParamDecorators.methodParams(MethodDecorated.prototype, "method").map(p => p.paramName),
        ["p1"]
    );
})
