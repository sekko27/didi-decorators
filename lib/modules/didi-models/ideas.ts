import { PropertyDecorators } from "../../decorators/property/PropertyDecorators.ts";

class AB {
    service: number | undefined;

    x: number = 10;

    y: number = 10;

    lala() {
        // @ts-ignore
        console.log(this.service);
    }
}

Object.defineProperty(AB.prototype, "service", {value: 10, writable: false});
Object.defineProperty(AB.prototype, "y", {
    get() {
        return this._y;
    },
    set(value) {
        this._y = value;
    },
})

class D {

}

// @ts-ignore
const ab = (new AB());
const cd = (new AB());
cd.y = 15;
ab.y = 2;
console.log(cd.y);

configurator.register(AModel).constant(AModel)
