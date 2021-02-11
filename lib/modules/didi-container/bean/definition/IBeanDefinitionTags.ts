import { Name } from "../../../didi-commons/lib/types/Name.ts";

export interface IBeanDefinitionTags extends Map<Name, any> {
}

// export type IBeanDefinitionTags = Map<Name, any>;

export function newBeanDefinitionTags(entries: [Name, any][] = []): IBeanDefinitionTags {
    return new Map(entries);
}
