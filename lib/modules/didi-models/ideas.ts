import { Name } from "../didi-commons/Name.ts";
import { BeanType } from "../didi-commons/BeanType.ts";

interface IDeSerMetadata<T> {
    field: string;
    alias?: string;
    type: BeanType<T>;
    transient?: boolean;
    definition: IDeSerDef;
    optional?: boolean;
    default?: T | (() => T | Promise<T>);
    index?: boolean | "unique";
}

interface IDeSerDef {

}

class ArrayDeSerDef implements IDeSerDef {
    constructor(private readonly elementDef: IDeSerDef) {
    }
}

class PrimitiveDeSerDef implements IDeSerDef {
    constructor(private readonly cls: BeanType<Number | Boolean | String | Date>) {
    }
}

class DeSerDefUtil {
    public static Array(elementDef: IDeSerDef) {
        return new ArrayDeSerDef(elementDef);
    }

    public static Number() {
        return new PrimitiveDeSerDef(Number);
    }
}

function DeSer(def: IDeSerDef) {
    return (cls: any, name: Name) => {

    }
}

function Transient() {
    return (cls: any, name: Name) => {

    }
}

function Field(name: string) {
    return (cls: any, name: Name) => {

    }
}

function Id(auto: boolean = true) {
    return (cls: any, name: Name) => {

    }
}

function Ref<T>(type: BeanType<T>) {
    return (cls: any, name: Name) => {

    }
}

class B {
    private b0: string;
}

class E {
    private ix: number;
}

class R {
    @Field("_id")
    @Id()
    private readonly id: string;

    private name: string;
}

class A {
    private field1?: number; // Primitive

    private b: B; // Embedded

    @Ref(R)
    private r: string; // Reference by id

    @DeSer(DeSerDefUtil.Array(DeSerDefUtil.Number()))
    private list: E[];

    @Transient()
    private readonly skipped: boolean;
}
