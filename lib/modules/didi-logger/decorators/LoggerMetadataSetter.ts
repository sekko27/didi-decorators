import { PropertyDecorators } from "../../../decorators/property/PropertyDecorators.ts";
import { TagsQuery } from "../../didi-queries/TagsQuery.ts";

export class LoggerMetadataSetter {
    public static readonly DEFAULT_LOGGER_NAME: string = "default";

    public static Logger(loggerName: string = LoggerMetadataSetter.DEFAULT_LOGGER_NAME) {
        return (cls: any, loggerProperty: string) => {
            const md = PropertyDecorators.propertyMetadata(cls, loggerProperty);
            md.tags = md.tags.merge(TagsQuery.byName(this.createLoggerBeanName(loggerName)))
        };
    }

    public static createLoggerBeanName(name: string): string {
        return `${name}.logger.didi.metrix`;
    }
}
