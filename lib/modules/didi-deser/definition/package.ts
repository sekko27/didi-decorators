import { IDeSerDefinition } from "./IDeSerDefinition.ts";
import { ArrayDeSerDefinition } from "./ArrayDeSerDefinition.ts";
import { PrimitiveType } from "../../didi-commons/TypeSupport.ts";
import { PrimitiveDeSerDefinition } from "./PrimitiveDeSerDefinition.ts";
import { BeanType } from "../../didi-commons/BeanType.ts";
import { ClassDeSerDefinition } from "./ClassDeSerDefinition.ts";
import { OptionalDeSerDefinition } from "./OptionalDeSerDefinition.ts";
import { AutoDeSerDefinition } from "./AutoDeSerDefinition.ts";
import { TransientDeSerDefinition } from "./TransientDeSerDefinition.ts";

export function Array(elementDefinition: IDeSerDefinition): ArrayDeSerDefinition {
    return new ArrayDeSerDefinition(elementDefinition);
}

export function Primitive(type: PrimitiveType): PrimitiveDeSerDefinition {
    return new PrimitiveDeSerDefinition(type);
}

export function Class<T>(type: BeanType<T>): ClassDeSerDefinition<T> {
    return new ClassDeSerDefinition<T>(type);
}

export function Optional(value: IDeSerDefinition): OptionalDeSerDefinition {
    return new OptionalDeSerDefinition(value);
}

export function Auto(value: IDeSerDefinition): AutoDeSerDefinition {
    return new AutoDeSerDefinition(value);
}

export function Transient(): TransientDeSerDefinition {
    return new TransientDeSerDefinition();
}
