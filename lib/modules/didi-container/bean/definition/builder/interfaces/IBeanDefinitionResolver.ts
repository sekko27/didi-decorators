export interface IBeanDefinitionResolver<T> {
    resolve(): Promise<T>;
}
