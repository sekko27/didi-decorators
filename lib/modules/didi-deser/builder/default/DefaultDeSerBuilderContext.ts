import { IDeSerBuilderContext } from "../IDeSerBuilderContext.ts";
import { BeanType } from "../../../didi-commons/BeanType.ts";
import { IDeSerDecoratorMetadata } from "../../decorators/IDeSerDecoratorMetadata.ts";
import { DeSerDecorators } from "../../decorators/DeSerDecorators.ts";

export class DefaultDeSerBuilderContext implements IDeSerBuilderContext {
    metadata(cls: BeanType<any>): IDeSerDecoratorMetadata[] {
        return DeSerDecorators.all(cls);
    }

}
