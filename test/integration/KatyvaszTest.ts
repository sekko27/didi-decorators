import { ContainerConfiguration } from "../../lib/modules/didi-container/bean/definition/configuration/ContainerConfiguration.ts";
import { Query } from "../../lib/modules/didi-queries/Query.ts";
import { TagsQuery } from "../../lib/modules/didi-queries/TagsQuery.ts";
import { ParamDecorators } from "../../lib/decorators/param/ParamDecorators.ts";
import { TypeSupport } from "../../lib/modules/didi-commons/TypeSupport.ts";
import { Prototype } from "../../lib/modules/didi-container/bean/definition/scope/Prototype.ts";
import { PropertyDecorators } from "../../lib/decorators/property/PropertyDecorators.ts";
import { SetterDecorators } from "../../lib/decorators/setter/SetterDecorators.ts";
import { InitMethodDecorators } from "../../lib/decorators/init-destroy-method/InitMethodDecorators.ts";
import { IAroundAOPHandler } from "../../lib/decorators/aop/types/IAroundAOPHandler.ts";
import { IJoinCut } from "../../lib/decorators/aop/types/IJoinCut.ts";
import { Invocation } from "../../lib/decorators/aop/types/Invocation.ts";
import { AOPDecorators } from "../../lib/decorators/aop/AOPDecorators.ts";
import { IAfterAOPHandler } from "../../lib/decorators/aop/types/IAfterAOPHandler.ts";

Deno.test("katyvasz", async () => {
    interface IBean {

    }
    class Bean implements IBean {
        constructor(@ParamDecorators.Inject() @ParamDecorators.Query(TagsQuery.byName("four")) readonly num: number) {
        }
    }

    class AOPHandler implements IAroundAOPHandler {
        constructor(
            @ParamDecorators.Inject() @ParamDecorators.Query(TagsQuery.byName("prefix")) private readonly prefix: string,
            @ParamDecorators.Inject() @ParamDecorators.Query(TagsQuery.byName("suffix")) private readonly suffix: string,
        ) {
        }
        apply<T, R>(joinCut: IJoinCut<T, R>, invocation: Invocation<R>, handlerArgs: void): R {
            const calculated = invocation(...joinCut.args.map(a => `${this.prefix}(${String(a)})`));
            return `${calculated}::${this.suffix}` as any;
        }

    }

    class AfterAOPHandler implements IAfterAOPHandler {
        apply<T, R>(joinCut: IJoinCut<T>, result: R, handlerArgs: void): void {
            console.log(`AFTER: ${String(result)}`);
        }

    }
    class Keszitettem {
        private _setter: number = 0;
        private _init: number = 0;

        constructor(readonly bean: IBean, readonly str: string, readonly num: number, readonly def: boolean = false) {
        }

        @AOPDecorators.After(AfterAOPHandler)
        @AOPDecorators.Around(AOPHandler)
        aopMethod(s1: string, s2: string): string {
            return `${s1},${s2}`;
        }

        @SetterDecorators.Setter()
        set setter(@ParamDecorators.Inject() @ParamDecorators.Query(TagsQuery.byName("setter")) value: number) {
            this._setter = value;
        }

        @InitMethodDecorators.Init()
        init(@ParamDecorators.Inject() @ParamDecorators.Query(TagsQuery.byName("init")) value: number) {
            this._init = this._setter * value;
        }
    }

    class GigaFactory {
        @PropertyDecorators.Property(TagsQuery.byName("num"))
        private num: number = 0;

        constructor(@ParamDecorators.Inject() @ParamDecorators.Query(TagsQuery.byName("munkas")) private readonly str: string) {
        }

        async kesziccs(@ParamDecorators.Inject() bean: Bean, @ParamDecorators.Inject() def: boolean = true): Promise<Keszitettem> {
            return new Keszitettem(bean, this.str, this.num, def);
        }
    }
    class ApplicationConfiguration extends ContainerConfiguration {

    }

    const configuration = new ApplicationConfiguration();


    configuration.register(Number).constant(4).as("four");
    configuration.register(Number).constant(1001).as("num");
    configuration.register(Number).constant(27).as("setter2");
    configuration.register(Number).constant(3).as("init");
    configuration.register(String).constant("PRE").as("prefix");
    configuration.register(String).constant("SUF").as("suffix");
    configuration.register(String).constant("munkas").as("munkas");
    configuration.register(Bean).instanceOf().as("bean");
    configuration.register(AOPHandler).instanceOf();
    configuration.register(AfterAOPHandler).instanceOf();
    configuration.register(GigaFactory).instanceOf();
    configuration.register(Keszitettem).factory(GigaFactory, "kesziccs").as("factoryResult");

    const container = await configuration.buildContainer().boot();
    const num = await container.bean(Query.byName("four"));
    const bean = await container.bean(Query.byName("bean"));
    const keszitettem = await container.bean(new Query(Keszitettem));
    console.log(num, bean, keszitettem, keszitettem.aopMethod("lala", "mama"));
});
