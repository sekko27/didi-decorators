import { ITagsPredicate } from "./types/ITagsPredicate.ts";
import { Name } from "../didi-commons/Name.ts";
import { Tags } from "./types/Tags.ts";

export class TagsPredicates {
    public static strict(key: Name, value: any): ITagsPredicate {
        return {
            test(tags: Tags): boolean {
                return tags.has(key) && tags.get(key) === value;
            } ,
            stringify(): string {
                return `Tags[${String(key)}] === ${value}`;
            }
        }
    }
}
