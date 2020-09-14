export type BeanFactoryClass<K extends string, T> = {[k in K]: (...args: any[]) => T | Promise<T>};
