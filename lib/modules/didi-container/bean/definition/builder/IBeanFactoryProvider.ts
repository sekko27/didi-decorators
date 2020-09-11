import { IBeanFactory } from "../../factory/IBeanFactory.ts";

export interface IBeanFactoryProvider<T> {
    supply(): IBeanFactory<T>;
}
