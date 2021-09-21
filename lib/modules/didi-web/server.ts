import { Optional } from "../didi-commons/lib/types/Optional.ts";
import { IPredicate } from "../didi-predicates/IPredicate.ts";

interface IRouterSpecMatchContext {
    readonly url: URL;
    readonly request: Request;
    readonly root: string;
    readonly path: string;
    readonly resolvedPathParams: Map<string, string>;

}

class RouterSpecMatchContext implements IRouterSpecMatchContext {
    readonly url: URL;
    readonly root: string;
    readonly path: string;

    constructor(readonly request: Request, root?: string, path?: string, readonly resolvedPathParams: Map<string, string> = new Map()) {
        this.url = new URL(request.url);
        this.root = root ?? "";
        this.path = path ?? this.url.pathname;
    }

}
interface IRouteSpec {
    match(ctx: IRouterSpecMatchContext): Promise<Optional<IRouterSpecMatchContext>>;
}

class PredicateRouteSpec implements IRouteSpec {
    constructor(private readonly predicate: IPredicate<IRouterSpecMatchContext>) {
    }

    async match(ctx: IRouterSpecMatchContext): Promise<Optional<IRouterSpecMatchContext>> {
        return this.predicate.test(ctx)
            ? Optional.of(ctx)
            : Optional.empty();
    }
}

class PathPrefixRouteSpec implements IRouteSpec {
    private constructor(private readonly segmentRegExps: [RegExp, string | undefined][]) {
    }

    public static fromPrefixTemplate(template: string) {
        const match = template.match(/^(\/({[a-z_]+}|[a-z_]+))+$/);
        if (match === null) {
            // TODO Sophisticated error need
            throw new TypeError(`Invalid route template: ${template}`);
        }
        const segmentRegExps: [RegExp, string | undefined][] = template.split('/')
            .map(s => s.startsWith("{") ? [/.*/, s.slice(1, -1)] : [new RegExp(`^${s}$`), undefined]);

        return new PathPrefixRouteSpec(segmentRegExps);
    }

    async match(ctx: IRouterSpecMatchContext): Promise<Optional<IRouterSpecMatchContext>> {
        const segments = ctx.path.split("/");
        const pathParams: Map<string, string> = new Map();
        const rootSegments: string[] = [ctx.root];
        for (const [r, n] of this.segmentRegExps) {
            const segment = segments.pop() ?? "";
            const match = segment.match(r);
            if (match === null) {
                return Optional.empty();
            }
            rootSegments.push(segment);
            if (n !== undefined) {
                pathParams.set(n, match[1]);
            }
        }
        const matchContext = new RouterSpecMatchContext(
            ctx.request,
            rootSegments.join("/"),
            `/${segments.join("/")}`,
            new Map([...ctx.resolvedPathParams, ...pathParams])
        );
        return Optional.of(matchContext);
    }
}
class BranchRouteSpec implements IRouteSpec {
    constructor(private readonly thisSpec: IRouteSpec, private readonly branches: IRouteSpec[]) {
    }

    async match(ctx: IRouterSpecMatchContext): Promise<Optional<IRouterSpecMatchContext>> {
        const optBranchContext = await this.thisSpec.match(ctx);
        if (optBranchContext.isPresent) {
            for (const branch of this.branches) {
                const resultContext = await branch.match(optBranchContext.value);
                if (resultContext.isPresent) {
                    return resultContext;
                }
            }
        }
        return Optional.empty();
    }
}

class RouterSpecContainer {
    private readonly specs: IRouteSpec[] = [];

    addSpec(spec: IRouteSpec): this {
        this.specs.push(spec);
        return this;
    }
}
async function handleConnection(conn: Deno.Conn) {
    const httpConn = Deno.serveHttp(conn);
    for await (const event of httpConn) {
        const {request} = event;
        const url = new URL(request.url);
        console.log(event);
        console.log("Method", request.method);
        console.log("Body used", request.bodyUsed);
        console.log("URL", url, url.searchParams.get("q"));
        console.log("Headers", request.headers);
        console.log("Body", request.body);
        console.log("Destination", request.destination);
        console.log("JSON", await request.json());
        await event.respondWith(new Response("ok", {status: 200}));
    }
}

const server = Deno.listen({port: 3000});
for await (const conn of server) {
    handleConnection(conn).catch(console.error);
}
