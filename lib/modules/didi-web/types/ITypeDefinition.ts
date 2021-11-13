import type { BeanType } from "../../didi-commons/lib/types/BeanType.ts";

export interface ITypeDefinition {
    is(value: any): boolean;
}

class $Any {
    is(value: any): boolean {
        return true;
    }
}

class $InstanceOf<T> implements ITypeDefinition {
    constructor(private readonly type: BeanType<T>) {
    }

    is(value: any): boolean {
        return value instanceof this.type;
    }
}

class $Number extends $InstanceOf<number> implements ITypeDefinition {
    constructor() { super(Number); }
}

class $String extends $InstanceOf<string> implements ITypeDefinition {
    constructor() { super(String); }
}

class $Boolean extends $InstanceOf<boolean> implements ITypeDefinition {
    constructor() { super(Boolean); }
}

class $Optional implements ITypeDefinition {
    constructor(private readonly internal: ITypeDefinition) {
    }

    is(value: any): boolean {
        return value === undefined || this.internal.is(value);
    }
}

class $Nullable implements ITypeDefinition {
    constructor(private readonly internal: ITypeDefinition) {
    }

    is(value: any): boolean {
        return value === null || this.internal.is(value);
    }
}

class $Array implements ITypeDefinition {
    constructor(private readonly elementType: ITypeDefinition) {
    }

    is(value: any): boolean {
        return Array.isArray(value) && value.find(elem => !this.elementType.is(elem)) === undefined;
    }
}

class $Tuple implements ITypeDefinition {
    private readonly elemTypes: ITypeDefinition[];

    constructor(...elemTypes: ITypeDefinition[]) {
        this.elemTypes = elemTypes;
    }

    is(value: any): boolean {
        return Array.isArray(value)
            && this.elemTypes.length >= value.length
            && this.elemTypes.find((et: ITypeDefinition, ix: number) => !et.is(value[ix])) === undefined;
    }
}

class $OneOf implements ITypeDefinition {
    private readonly elemTypes: ITypeDefinition[];

    constructor(...elemTypes: ITypeDefinition[]) {
        this.elemTypes = elemTypes;
    }

    is(value: any): boolean {
        return this.elemTypes.find(et => et.is(value)) !== undefined;
    }
}

export class TypeDefinitions {
    public static readonly Num: $Number = new $Number();
    public static readonly Str: $String = new $String();
    public static readonly Bool: $Boolean = new $Boolean();
    public static readonly Any: $Any = new $Any();

    public static InstanceOf<T>(cls: BeanType<T>): $InstanceOf<T> {
        return new $InstanceOf(cls);
    }

    public static Opt(internal: ITypeDefinition): $Optional {
        return new $Optional(internal);
    }

    public static Nullable(internal: ITypeDefinition): $Nullable {
        return new $Nullable(internal);
    }

    public static Arr(elemType: ITypeDefinition): $Array {
        return new $Array(elemType);
    }

    public static Tuple(...elemTypes: ITypeDefinition[]): $Tuple {
        return new $Tuple(...elemTypes);
    }

    public static OneOf(...elemTypes: ITypeDefinition[]): $OneOf {
        return new $OneOf(...elemTypes);
    }
}
