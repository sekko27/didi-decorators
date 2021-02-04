import { IDeSer } from "../../definition/IDeSer.ts";
import { BeanType } from "../../../didi-commons/BeanType.ts";
import { SealedDecorators } from "../../../../decorators/sealed/SealedDecorators.ts";
import { DeSerError } from "../../errors/DeSerError.ts";

export interface IDefaultClassFieldDeSerDescriptor {
    name: string;
    alias: string;
    deser: IDeSer;
}

export class DefaultClassDeSer implements IDeSer {
    private static readonly DISCRIMINATOR_KEY: string = "__sealed__";

    constructor(
        private readonly cls: BeanType<any>,
        private readonly fieldDescriptors: IDefaultClassFieldDeSerDescriptor[]
    ) {
    }

    deserialize(source: any): any {
        const alias = source?.[DefaultClassDeSer.DISCRIMINATOR_KEY];
        const implementationClass = SealedDecorators.getImplementationClass(this.cls, alias);
        if (implementationClass === undefined) {
            throw new DeSerError(`No sealed implementation exists for class "${this.cls}" by alias ${alias}`);
        }
        const instance = Object.create(implementationClass.prototype);
        for (const fd of this.fieldDescriptors) {
            const value = fd.deser.deserialize(source?.[fd.alias]);
            if (value !== undefined) {
                (instance as any)[fd.name] = value;
            }
        }
        // Object.assign(instance, source);
        // instance.constructor = implementationClass;
        return instance;
    }

    serialize(source: any): any {
        const typeAlias = SealedDecorators.getImplementationAlias(this.cls, source.constructor);
        if (typeAlias === undefined) {
            throw new DeSerError(`Type ${source.constructor} does not belong to sealed classes of ${this.cls}`);
        }
        // TODO Key name should be parameter on somewhere
        const entries = [[DefaultClassDeSer.DISCRIMINATOR_KEY, typeAlias]]
            .concat(this.fieldDescriptors.map(fd => [fd.alias, fd.deser.serialize(source?.[fd.name])]))
            .filter(([k, v]) => v !== undefined);
        return Object.fromEntries(entries);
    }

}
