import { Tags } from "./types/Tags.ts";

export class TagsUtil {
    public static stringify(tags: Tags): string {
        const entries = Array.from(tags.entries()).map(([k, v]) => `${String(k)}=${String(v)}`).join(",");
        return `Tags[${entries}]`;
    }
}
