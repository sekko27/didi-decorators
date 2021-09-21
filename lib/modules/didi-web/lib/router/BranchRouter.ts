import { IRouter } from "./interfaces/IRouter.ts";
import { IRouterContext } from "./interfaces/IRouterContext.ts";
import { Optional } from "../../../didi-commons/lib/types/Optional.ts";

export class BranchRouter implements IRouter {
    constructor(private readonly branches: IRouter[]) {
    }

    async route(context: IRouterContext): Promise<Optional<Response>> {
        for (const branch of this.branches) {
            const result = await branch.route(context);
            if (result.isPresent) {
                return result;
            }
        }
        return Optional.empty();
    }
}
