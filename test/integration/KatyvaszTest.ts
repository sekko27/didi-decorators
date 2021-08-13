import { ContainerConfiguration } from "../../lib/modules/didi-container/bean/definition/configuration/ContainerConfiguration.ts";
import { Query } from "../../lib/modules/didi-queries/Query.ts";
import { TagsQuery } from "../../lib/modules/didi-queries/TagsQuery.ts";
import { ParamDecorators } from "../../lib/decorators/param/ParamDecorators.ts";
import { ConstructorPropertyDecorators, PropertyDecorators } from "../../lib/decorators/property/PropertyDecorators.ts";
import { SetterDecorators } from "../../lib/decorators/setter/SetterDecorators.ts";
import { InitMethodDecorators } from "../../lib/decorators/init-destroy-method/InitMethodDecorators.ts";
import { IAroundAOPHandler } from "../../lib/decorators/aop/types/IAroundAOPHandler.ts";
import { IJoinCut } from "../../lib/decorators/aop/types/IJoinCut.ts";
import { Invocation } from "../../lib/decorators/aop/types/Invocation.ts";
import { AOPDecorators } from "../../lib/decorators/aop/AOPDecorators.ts";
import { IAfterAOPHandler } from "../../lib/decorators/aop/types/IAfterAOPHandler.ts";
import { IPostConfigurator } from "../../lib/modules/didi-container/bean/definition/configuration/post-configurator/IPostConfigurator.ts";
import { IPostConfiguratorTarget } from "../../lib/modules/didi-container/bean/definition/configuration/post-configurator/IPostConfiguratorTarget.ts";
import { PostConfiguratorDecorators } from "../../lib/decorators/post-configurator/PostConfiguratorDecorators.ts";
import {
    Color,
    EnableLogger,
    IHoustonConfiguration,
    Logger,
    LoggerMetadataSetter,
    LoggerType, LogLevel,
    ConsoleTransport, Format, TimePrefix, LogLevelDisplay, ILogger,
} from "../../lib/modules/didi-logger/mod.ts";
import { TagDecorator } from "../../lib/decorators/tag/TagDecorator.ts";

Deno.test("katyvasz", async () => {
    interface IBean {

    }

    @TagDecorator.Tag("i", "am")
    class BeanTags {

    }
    @TagDecorator.Tag("kind", "bean")
    class Bean implements IBean {
        constructor(@ParamDecorators.Inject() @ParamDecorators.Query(TagsQuery.byName("four")) readonly num: number) {
        }

        multiply(other: number): number {
            return this.num * other;
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

        @LoggerMetadataSetter.Logger()
        private readonly logger: Logger;

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
            // @ts-ignore
            for (const transport in this?.logger.transports) {
                // @ts-ignore
                console.log("xxxx", transport, this?.logger.transports[transport].log);
            }
            this.logger?.info("!!!!!!!!!!!!!!! Hello from init method !!!!!!!!!!!!!!!");
            console.log("finish");
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

    class SamplePostConfigurator implements IPostConfigurator {
        async configure(target: IPostConfiguratorTarget): Promise<void> {
            target.register(Twice).instanceOf();
            for (const num of await target.filter(new Query(Number))) {
                if (num.meta.tags.has(ParamDecorators.NAME_TAG)) {
                    const name = num.meta.tags.get(ParamDecorators.NAME_TAG);
                    target.register(Number).factory(Twice, "factory")
                        .qualifyParam("source", Query.byName(name))
                        .as(`twice-${name}`);
                }
            }
            return Promise.resolve(undefined);
        }

    }

    function EnableSample() {
        return (target: any) => {
            PostConfiguratorDecorators.register(target, "sample", new SamplePostConfigurator());
        };
    }

    @EnableLogger(LoggerType.HOUSTON, new Map<string, IHoustonConfiguration>([
        [
            LoggerMetadataSetter.DEFAULT_LOGGER_NAME,
            {
                transports: [new ConsoleTransport()],
                options: {
                    format: Format.text,
                    prefix: new TimePrefix(),
                    logLevelDisplay: LogLevelDisplay.Icon,
                    logColors: {
                        [LogLevel.Info]: Color.Green,
                        [LogLevel.Error]: Color.Red,
                        [LogLevel.Success]: Color.White,
                        [LogLevel.Warning]: Color.Cyan,
                    }
                }
            }
        ]
    ]))
    @EnableSample()
    class ApplicationConfiguration extends ContainerConfiguration {

    }

    class Twice {
        async factory(@ParamDecorators.Inject() source: number): Promise<number> {
            return source * 2;
        }
    }

    const configuration = new ApplicationConfiguration();

    @TagDecorator.Tag("kind", "model")
    class ModelTagProto {

    }

    class AModel {

        @ConstructorPropertyDecorators.Property()
        public bean: Bean;

        test(value: number) {
            return this.bean.multiply(value);
        }
    }

    configuration.register(Number).constant(4).as("four");
    configuration.register(Number).constant(1001).as("num");
    configuration.register(Number).constant(27).as("setter");
    configuration.register(Number).constant(3).as("init");
    configuration.register(String).constant("PRE").as("prefix");
    configuration.register(String).constant("SUF").as("suffix");
    configuration.register(String).constant("munkas").as("munkas");
    configuration.register(Function).constant(AModel).as("a-model")
        .useTagsOn(ModelTagProto)
        .tag("x", "y");

    configuration.register(Bean).instanceOf().as("bean").useTagsOn(BeanTags);
    configuration.register(AOPHandler).instanceOf();
    configuration.register(AfterAOPHandler).instanceOf();
    configuration.register(GigaFactory).instanceOf();
    configuration.register(Keszitettem).factory(GigaFactory, "kesziccs").as("factoryResult");

    class XX {
        readonly lala: number = 1;
    }

    class YY {}
    // @ts-ignore
    Object.defineProperty(YY.prototype, "X", {get: () => new XX(), enumerable: true, configurable: true});
    // @ts-ignore
    console.log(YY, YY.prototype, YY.prototype.X, new YY().X, "XX");
    const container = await (await configuration.buildContainer()).boot();
    const num = await container.bean(Query.byName("four"));
    const bean = await container.bean(Query.byName("bean"));
    const twice_four = await container.bean(Query.byName("twice-four"));
    const keszitettem = await container.bean(new Query(Keszitettem));
    const modelClass = await container.bean(Query.byName("a-model"));
    const model: AModel = new modelClass();
    // @ts-ignore
    console.log(modelClass.prototype, model.bean);
    const taggedBean = await container.bean(Query.byTag("i", "am"));
    const taggedBean2 = await container.bean(Query.byTag("kind", "bean"));

    console.log(num, bean, keszitettem, keszitettem.aopMethod("lala", "mama"), twice_four, model.test(111), taggedBean, taggedBean2);
});
