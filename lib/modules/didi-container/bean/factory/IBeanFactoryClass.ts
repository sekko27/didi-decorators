export interface IBeanFactoryClass<T> {
    create: (...args: any[]) => Promise<T>;
}
