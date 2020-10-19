import { IParamDecoratorMetadata } from "../../../../../../decorators/param/IParamDecoratorMetadata.ts";
import { IParamListResolverContext } from "../interfaces/IParamListResolverContext.ts";

export class ParamListResolverError extends Error {
    private static readonly CAUSE_SECTION_DELIMITER: string = "======================";
    constructor(
        message: string,
        readonly parameterMetadata: IParamDecoratorMetadata<any>,
        readonly context: IParamListResolverContext,
        readonly causes: Error[] = []
    ) {
            super(`${message}:\n${ParamListResolverError.CAUSE_SECTION_DELIMITER}\n${ParamListResolverError.stringifyCauses(causes)}\n${ParamListResolverError.CAUSE_SECTION_DELIMITER}`);
    }

    private static stringifyCauses(causes: Error[] = []): string {
        return causes.map((c, ix) => ` [${ix}] => ${c.message}`).join("\n");
    }

    /**
     * @throws ParamListResolverError
     */
    public static nonResolvable(parameterMetadata: IParamDecoratorMetadata<any>, context: IParamListResolverContext, errors: Error[]): ParamListResolverError {
        return new this(`No matching param list resolver`, parameterMetadata, context, errors);
    }
}
