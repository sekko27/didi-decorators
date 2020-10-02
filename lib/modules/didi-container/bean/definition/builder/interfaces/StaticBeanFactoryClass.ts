import { BeanFactoryClass } from "./BeanFactoryClass.ts";

export const X: BeanFactoryClass<"create", Number> = {
    create(): Number {
        return 1;
    }
}
