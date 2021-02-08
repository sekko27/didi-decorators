import { IDeSerDefinition } from "./IDeSerDefinition.ts";
import { ArrayDeSerDefinition } from "./ArrayDeSerDefinition.ts";
import { PrimitiveType } from "../../didi-commons/TypeSupport.ts";
import { PrimitiveDeSerDefinition } from "./PrimitiveDeSerDefinition.ts";
import { BeanType } from "../../didi-commons/BeanType.ts";
import { ClassDeSerDefinition } from "./ClassDeSerDefinition.ts";
import { OptionalDeSerDefinition } from "./OptionalDeSerDefinition.ts";
import { AutoDeSerDefinition } from "./AutoDeSerDefinition.ts";
import { TransientDeSerDefinition } from "./TransientDeSerDefinition.ts";
import { MixedDeSerDefinition } from "./MixedDeSerDefinition.ts";

export function Arr(elementDefinition: IDeSerDefinition): ArrayDeSerDefinition {
    return new ArrayDeSerDefinition(elementDefinition);
}

export function Primitive(type: BeanType<PrimitiveType>): PrimitiveDeSerDefinition {
    return new PrimitiveDeSerDefinition(type);
}

export function Class(type: BeanType<any>): ClassDeSerDefinition {
    return new ClassDeSerDefinition(type);
}

export function Mixed(): MixedDeSerDefinition {
    return new MixedDeSerDefinition();
}
export function Optional(value: IDeSerDefinition): OptionalDeSerDefinition {
    return new OptionalDeSerDefinition(value);
}

export function Auto(value: IDeSerDefinition): AutoDeSerDefinition {
    return new AutoDeSerDefinition(value);
}

const transient = new TransientDeSerDefinition();
export function Transient(): TransientDeSerDefinition {
    return transient;
}
