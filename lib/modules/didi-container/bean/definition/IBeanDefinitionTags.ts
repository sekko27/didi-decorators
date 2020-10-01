import { Name } from "../../../didi-commons/Name.ts";

export interface IBeanDefinitionTags {
    set(key: Name, value: any): void;
    has(key: Name): boolean;
}

// export type IBeanDefinitionTags = Map<Name, any>;

export function newBeanDefinitionTags(): IBeanDefinitionTags {
    return new Map();
}
