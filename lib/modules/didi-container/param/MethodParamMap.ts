import { Name } from "../../didi-commons/Name.ts";
import { BeanType } from "../../didi-commons/BeanType.ts";

export class MethodParamMap<T = any> {
    private readonly entries: {type: BeanType<any>, method: Name, param: string, value: T}[] = [];

    getOrThrow(type: BeanType<any>, method: Name | undefined, param: string, errorProvider: () => Error): T {
        const match = this.entries.find(e => e.type === type &&  e.method === method && e.param === param);
        if (match === undefined) {
            throw errorProvider();
        }
        return match.value;
    }
}
