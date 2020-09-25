import { BaseBeanDefinitionBuilder } from "./BaseBeanDefinitionBuilder.ts";
import { IBeanDefinition } from "../IBeanDefinition.ts";
import { IBeanDefinitionBuilder } from "./IBeanDefinitionBuilder.ts";
import { BeanType } from "../../../../didi-commons/BeanType.ts";
import { Constant } from "../../factory/Constant.ts";
import { Singleton } from "../../scope/Singleton.ts";

export class ConstantBeanDefinitionBuilder<T> extends BaseBeanDefinitionBuilder<T, IBeanDefinition<T>> implements IBeanDefinitionBuilder<T, IBeanDefinition<T>> {
    constructor(type: BeanType<T>, value: T | Promise<T>) {
        super(
            type,
            new Constant(type, value),
            new Singleton()
        );
    }


    protected buildCustom() {
        return {
            params: new Map()
        };
    }


}
