import { Name } from "../../../didi-commons/Name.ts";

export interface IBeanDefinitionTags extends Map<Name, any> {
}

// export type IBeanDefinitionTags = Map<Name, any>;

export function newBeanDefinitionTags(): IBeanDefinitionTags {
    return new Map();
}
