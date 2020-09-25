import { IScope } from "../scope/IScope.ts";
import { IBeanFactory } from "../factory/IBeanFactory.ts";
import { IParamListResolverContext } from "../../param/interfaces/IParamListResolverContext.ts";
import { BeanType } from "../../../didi-commons/BeanType.ts";
import { Name } from "../../../didi-commons/Name.ts";
import { IQuery } from "../../../didi-queries/interfaces/IQuery.ts";
import { IBeanResolver } from "../IBeanResolver.ts";
import { IParamListResolver } from "../../param/interfaces/IParamListResolver.ts";
import { IParamDecoratorMetadata } from "../../../../decorators/param/IParamDecoratorMetadata.ts";
import { Constant } from "../factory/Constant.ts";
import { InstanceOf } from "../factory/InstanceOf.ts";

interface IBeanDefinitionMeta<T> {
    readonly type: BeanType<T>;
    readonly tags: Map<Name, any>;
    readonly optional: boolean;
}

interface IBeanDefinitionResolver<T> {
    resolve(): Promise<T>;
}

class InstanceOfBeanDefinitionResolver<T> implements IBeanDefinitionResolver<T> {
    constructor(scope: IScope<T>, factory: InstanceOf<T>, params, qualifiers, beanResolver: IBeanResolver, paramListResolver: IParamListResolver) {
    }

    paramList(paramListMeta): Promise<any> {}

    resolve() {
        scope.resolve(factory, this);
    }
}
interface IBeanDefinition<T> {
    meta: IBeanDefinitionMeta<T>;
    resolverFactory: (beanResolver: IBeanResolver, paramListResolver: IParamListResolver) => IBeanDefinitionResolver<T>;
}
export interface IBeanDefinition<T> {

    resolve(): Promise<T>;
    bean<B>(query: IQuery<B>): Promise<B>;
    paramList(metadata: IParamDecoratorMetadata<any>[]): Promise<any[]>;
/*    readonly factory: IBeanFactory<T>;
    readonly scope: IScope<T>;
    readonly params: Map<string, any>;
    readonly qualifiers: Map<string, IQuery<any>>;*/
}
/*

@Model("a")
class AModel {}

for (const modelDefinition of await container.getBeanDefinitions(Model)) {
    const name = getName(modelDefinition);
    container.factory(MongooseSchema, SchemaFactory).qualify({name: NamePredicate(name)}).tag({name});
    container.factory(MongooseModel, MongooseModelFactory).qualify({name});
}

class MongooseModelFactory {
    create(@Inject("name") schema: MongooseSchema): Promise<MongooseModel>;
}

class PricelistComponent {}

container.instanceOf(AnOtherPricelistComponentImpl).overwrite(PricelistModule.PricelistComponent);
@EnablePricelist({

})
class Configuration {

}
*/
