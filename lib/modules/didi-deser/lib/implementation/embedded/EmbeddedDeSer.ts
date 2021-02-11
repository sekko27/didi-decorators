import { IDeSer } from "../../interfaces/IDeSer.ts";
import { BeanType } from "../../../../didi-commons/lib/types/BeanType.ts";
import { SealedDecorators } from "../../../../../decorators/sealed/SealedDecorators.ts";
import { DeSerError } from "../../errors/DeSerError.ts";

export interface IDefaultClassFieldDeSerDescriptor {
    name: string;
    alias: string;
    deser: IDeSer;
}

export class EmbeddedDeSer implements IDeSer {
    private static readonly DISCRIMINATOR_KEY: string = "__sealed__";

    constructor(
        private readonly cls: BeanType<any>,
        private readonly fieldDescriptors: IDefaultClassFieldDeSerDescriptor[]
    ) {
    }

    deserialize(source: any): any {
        const alias = source?.[EmbeddedDeSer.DISCRIMINATOR_KEY];
        const implementationClass = SealedDecorators.getChildClass(this.cls, alias);
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
        return instance;
    }

    serialize(source: any): any {
        const typeAlias = SealedDecorators.getChildAlias(this.cls, source.constructor);
        if (typeAlias === undefined) {
            throw new DeSerError(`Type ${source.constructor} does not belong to sealed classes of ${this.cls}`);
        }
        // TODO Key name should be parameter on somewhere
        const entries = [[EmbeddedDeSer.DISCRIMINATOR_KEY, typeAlias]]
            .concat(this.fieldDescriptors.map(fd => [fd.alias, fd.deser.serialize(source?.[fd.name])]))
            .filter(([k, v]) => v !== undefined);
        return Object.fromEntries(entries);
    }

}
