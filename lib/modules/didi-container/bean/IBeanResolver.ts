import { IBean } from "./IBean.ts";
import { IQuery } from "../../didi-queries/interfaces/IQuery.ts";

export interface IBeanResolver {
    /**
     *
     * @param query
     * @throws BeanNotFoundResolutionError | AmbiguousBeansResolutionError
     */
    resolve<B>(query: IQuery<B>): IBean<B>;
}
/*

class A {
    @Property(query)
    public prop: string;
    public static readonly fmp: symbol = Symbol.of("LALA");
    public static readonly smp: symbol = Symbol.of("LALA");

    factoryMethod(@Inject("qualifyName") @Query(Tags) param: string, k: number) {}
    set lala(@Inject("name2") p: number);
}

A.factoryMethod(k: 2, param: '100');

configuration.register(String).insteanceOf(A).qualify("factoryMethod", 0, customTags = {});

.resolve() <=> (string, tags + customTags)
/!*

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
*!/
*/
