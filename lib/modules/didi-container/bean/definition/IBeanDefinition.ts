import { TaggedType } from "../../../didi-tags/TaggedType.ts";
import { IScope } from "../scope/IScope.ts";
import { IBeanFactory } from "../factory/IBeanFactory.ts";
import { IPredicate } from "../../../didi-predicates/IPredicate.ts";
import { IParamResolverContext } from "../../param/IParamResolverContext.ts";

export interface IBeanDefinition<T> {
    // TODO Separate tags and type
    readonly taggedType: TaggedType<T>;
    readonly factory: IBeanFactory<T>;
    readonly scope: IScope<T>;
    readonly paramResolverContext?: IParamResolverContext;
    readonly optional?: boolean;
}

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
