import { BaseBeanDefinitionBuilder } from "./BaseBeanDefinitionBuilder.ts";
import { IBeanDefinition } from "../IBeanDefinition.ts";
import { IBeanDefinitionBuilder } from "./IBeanDefinitionBuilder.ts";
import { BeanType } from "../../../../didi-commons/BeanType.ts";
import { Supply } from "../../factory/Supply.ts";

export class SupplyBeanDefinitionBuilder<T>
    extends BaseBeanDefinitionBuilder<T, IBeanDefinition<T>> implements IBeanDefinitionBuilder<T, IBeanDefinition<T>> {
    constructor(type: BeanType<T>, supplier: () => (Promise<T> | T)) {
        super(type, new Supply(type, supplier));
    }

    protected buildCustom() {
        return {};
    }


}
