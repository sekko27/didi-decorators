import { ContainerConfiguration } from "../../lib/modules/didi-container/bean/definition/configuration/ContainerConfiguration.ts";
import { Query } from "../../lib/modules/didi-queries/Query.ts";
import { TagsQuery } from "../../lib/modules/didi-queries/TagsQuery.ts";
import { ParamDecorators } from "../../lib/decorators/param/ParamDecorators.ts";
import { TypeSupport } from "../../lib/modules/didi-commons/TypeSupport.ts";
import { Prototype } from "../../lib/modules/didi-container/bean/definition/scope/Prototype.ts";

Deno.test("katyvasz", async () => {
    interface IBean {

    }
    class Bean implements IBean {
        constructor(@ParamDecorators.Inject() readonly num: number) {
        }
    }

    class Keszitettem {
        constructor(readonly bean: IBean, readonly str: string, readonly def: boolean = false) {
        }
    }

    class GigaFactory {
        constructor(@ParamDecorators.Inject() private readonly str: string) {
        }

        async kesziccs(@ParamDecorators.Inject() bean: Bean, @ParamDecorators.Inject() def: boolean = true): Promise<Keszitettem> {
            return new Keszitettem(bean, this.str, def);
        }
    }
    class ApplicationConfiguration extends ContainerConfiguration {

    }

    const configuration = new ApplicationConfiguration();


    configuration.register(Number).constant(4).as("four");
    configuration.register(String).constant("munkas").as("munkas");
    configuration.register(Bean).instanceOf().as("bean");
    configuration.register(GigaFactory).instanceOf();
    configuration.register(Keszitettem).factory(GigaFactory, "kesziccs").as("factoryResult");

    const container = await configuration.buildContainer();// .boot();
    const num = await container.resolve(Query.byName("four"));
    const bean = await container.resolve(Query.byName("bean"));
    const keszitettem = await container.resolve(new Query(Keszitettem));
    console.log(num, bean, keszitettem);
});
