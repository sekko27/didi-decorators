import { IDeSer } from "./IDeSer.ts";
import { BeanType } from "../../../didi-commons/BeanType.ts";
import { DeSerUtil } from "./DeSerUtil.ts";
import { Name } from "../../../didi-commons/Name.ts";
import { TypeSupport } from "../../../didi-commons/TypeSupport.ts";

class ArrDeSer implements IDeSer {
    constructor(elementDeSer: IDeSer, baseDeSer: IDeSer) {
    }

    deserialize<M>(cls: BeanType<M>, source: object): M {
        return undefined;
    }


}

function Arr(elementTyypeOrMarker) {
    return new ArrDeSer(elementTyypeOrMarker instanceof Marker ? elementTyypeOrMarker : new JSDeSer())
}
class A {
    @Type(Arr(Tuple(String, B)))
    public a: [string, B][];

    @Type(Discriminated())
    public b: IF;
}
export class JSDeSer implements IDeSer {
    deserialize<M>(cls: BeanType<M>, source: any, name?: Name): M {
        if (this.isMarked(cls, name)) {
            const marker = this.getMarker(cls, name);
            const realType = marker.getType();
            if (realType instanceof Array) {
                const elementTypeOrMarker = marker.getNestedType();

            }
        }
        if (this.isPrimitive(cls, source)) {
            return source;
        } else if (cls instanceof Array) {
            const elementType = this.arrayPropertyElementType(cls, name as Name);
            return (source as any[]).map(e =>  this.deserialize(elementType, e)) as any;
        } else {
            const instance = Object.create(cls.prototype);
            for (const [name, value] of Object.entries(source)) {
                (instance as any)[name] = this.deserialize(this.propertyType(cls, name), value, name);
            }
            Object.assign(instance, source);
            instance.constructor = cls;
            return instance;

        }
    }

    serialize<M>(instance: M): object {
        const propertyNames = DeSerUtil.propertyNames(instance);
        return
        return undefined;
    }

    propertyType(cls: BeanType<any>, name: Name): BeanType<any> {
        return JSDeSer;
    }

    // TODO Remove undefined
    arrayPropertyElementType(cls: BeanType<any>, name: Name): BeanType<any> {
        return JSDeSer;
    }

    isPrimitive(cls: BeanType<any>, value: any): boolean {
        return value === undefined
            || value === null
            || isNaN(value)
            || typeof value === "number" && !isFinite(value)
            || cls === Object
            || TypeSupport.isPrimitiveType(cls);
    }
}
