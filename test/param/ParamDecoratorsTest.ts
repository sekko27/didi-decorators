import { assertEquals, assertThrows } from "../../deps.ts";

import { ParamDecorators } from "../../lib/param/ParamDecorators.ts";
import { ConstantPredicate } from "../../lib/modules/didi-predicates/ConstantPredicate.ts";
import { MissingParameterDecorationError } from "../../lib/param/MissingParameterDecorationError.ts";
import { TagsPredicates } from "../../lib/modules/didi-tags/TagsPredicates.ts";
import { ITagsPredicate } from "../../lib/modules/didi-tags/types/ITagsPredicate.ts";
import { Tags } from "../../lib/modules/didi-tags/types/Tags.ts";

Deno.test("paramName is undefined by default", () => {
    class ParamNameUndefinedByDefault {
        method(@ParamDecorators.Inject() param: string) {}
    }

    assertEquals(
        ParamDecorators.resolveParamsMetadata(ParamNameUndefinedByDefault.prototype, "method"),
        [{
            target: ParamNameUndefinedByDefault.prototype,
            type: String,
            methodName: "method",
            index: 0,
            query: ConstantPredicate.TRUE,
        }],
    );
});

Deno.test("paramName is configurable", () => {
    class ParamNameIsConfigurable {
        method(@ParamDecorators.Inject("x") param: string) {}
    }

    assertEquals(
        ParamDecorators.resolveParamsMetadata(ParamNameIsConfigurable.prototype, "method"),
        [{
            target: ParamNameIsConfigurable.prototype,
            type: String,
            methodName: "method",
            index: 0,
            paramName: "x",
            query: ConstantPredicate.TRUE,
        }],
    );
});

Deno.test("resolution resolve non-annotated params too", () => {
    class NonAnnotatedParamResolution {
        method(@ParamDecorators.Inject("p") p1: string, p2: number) {}
    }

    assertEquals(
        ParamDecorators.resolveParamsMetadata(NonAnnotatedParamResolution.prototype, "method"),
        [{
            target: NonAnnotatedParamResolution.prototype,
            type: String,
            methodName: "method",
            index: 0,
            paramName: "p",
            query: ConstantPredicate.TRUE,
        }, {
            target: NonAnnotatedParamResolution.prototype,
            type: Number,
            methodName: "method",
            index: 1,
            query: ConstantPredicate.TRUE,
        }],
    );
});

Deno.test("should throw error on non-decorated params at all", () => {
    assertThrows(() => {
        class NonDecoratedAtAll {
            method(p1: string, p2: number) {}
        }

        ParamDecorators.resolveParamsMetadata(NonDecoratedAtAll.prototype, "method");
    }, MissingParameterDecorationError);
});

Deno.test("injection filter can be configurable by Query decorator", () => {
    const tKey: string = "k_e_y";
    const tValue: string = "v_a_l_u_e";

    const predicate: ITagsPredicate = {
        test(value: Tags): boolean {
            return value.has(tKey) && value.get(tKey) === tValue;
        },
        stringify(): string {
            return "test";
        }
    }
    class QueryFilter {
        method(@ParamDecorators.Query(predicate) p1: string) {}
    }

    assertEquals(
        ParamDecorators.resolveParamsMetadata(QueryFilter.prototype, "method")[0]
            .query.test(new Map([[tKey, tValue]])),
        true
    );
});
