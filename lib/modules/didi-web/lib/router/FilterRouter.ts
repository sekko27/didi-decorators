import { IRouter } from "./interfaces/IRouter.ts";
import { IPredicate } from "../../../didi-predicates/IPredicate.ts";
import { IRouterContext } from "./interfaces/IRouterContext.ts";
import { Optional } from "../../../didi-commons/lib/types/Optional.ts";

export class FilterRouter implements IRouter {
    constructor(private readonly predicate: IPredicate<IRouterContext>, private readonly next: IRouter) {
    }

    async route(context: IRouterContext): Promise<Optional<Response>> {
        return await this.predicate.test(context)
            ? this.next.route(context)
            : Optional.empty();
    }

}

@AggregateRoute("/resources")
@ControllerDoc("Resources controller")
class Controller {
    @Get("/{id}")
    @ActionDoc("Fetch")
    @Response(Resource, 200)
    @Response(List(Resource), 200)
    @ErrorResponse(Resource, 404)
    @ErrorResponse(Error, 500)
    @Role()
    async fetchOne(@PathParam("id") id: string): Promise<Resource> {

    }

    create(@JsonBody() request: Resource) {

    }
}

AggregateRoute(
    "/resources",
    Get(
        "/{id}",
        PathParam("id", String)
    )
)
