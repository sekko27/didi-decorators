import { IPredicate } from "../../didi-predicates/IPredicate.ts";
import { IBean } from "./IBean.ts";
import { IParamDecoratorMetadata } from "../../../decorators/param/IParamDecoratorMetadata.ts";
import { BeanDefinitionQuery } from "./BeanDefinitionQuery.ts";

export interface IBeanProvider {
    getBean<B>(query: BeanDefinitionQuery<B>): IBean<B>;
    resolveParams(paramMetadata: IParamDecoratorMetadata<any>[]): Promise<any[]>;
}
/*

class A {
    beanDefinitions: [];
    beanInstantiationTracking: Map<IBeanDefinition<any>, boolean>;
    beans: Set<IBean<any>>;

    getBean(query) {
        const beanDefinition = this.getBeanDefinition(query);
        if (!this.beanInstantiationTracking.has(beanDefinition)) {
            this.beanInstantiationTracking.set(beanDefinition, false);
            const bean = await this.resolve(beanDefinition);
            this.beans.add(bean);
            this.beanInstantiationTracking.set(beanDefinition, true);
            return bean;
        } else {
            if (this.beanInstantiationTracking.get(beanDefinition) === false) {
                throw error;
            }
            const bean = await this.resolve(beanDefinition);
            this.beans.add(bean);
            return bean;
        }
    }
}
if (!container.exists(definition)) {
    const vmi = new({count: 0, instance: null});
    container.add(vmi);
    this.resolve(definition);
} else {
    const vmi = container.get(definition);
    if (vmi.count ===0 ) {
        throw szopo();
    }
}
*/
