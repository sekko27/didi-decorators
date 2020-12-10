export {
    Houston,
    ConsoleTransport, LogLevel, Format, Color, TimePrefix, LogLevelDisplay
} from "https://deno.land/x/houston/mod.ts";

export type { ITransport, Options } from "https://deno.land/x/houston/mod.ts";

import { IHoustonConfiguration } from "./houston/IHoustonConfiguration.ts";
import { EnableHouston } from "./houston/EnableHouston.ts";
import { ILogger } from "./interfaces/ILogger.ts";

export enum LoggerType {
    HOUSTON = "Houston",
}

export type LoggerConfiguration<T extends LoggerType> =
    T extends LoggerType.HOUSTON ? Map<string, IHoustonConfiguration> : never;

export function EnableLogger<T extends LoggerType>(
    type: T,
    configuration?: LoggerConfiguration<T>
): ClassDecorator {
    switch (type) {
        case LoggerType.HOUSTON:
            return EnableHouston(configuration);
        default:
            throw new ReferenceError(`Invalid logger type: ${type}`);
    }
}

export { EnableHouston } from "./houston/EnableHouston.ts";
export type { IHoustonConfiguration } from "./houston/IHoustonConfiguration.ts";
export type { ILogger } from "./interfaces/ILogger.ts";
export { LoggerMetadataSetter } from "./decorators/LoggerMetadataSetter.ts";

export type Logger = ILogger | undefined;
