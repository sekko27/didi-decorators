import { IDeSerDefinition } from "./IDeSerDefinition.ts";

export type RegistrationDeSerDefinitionProvider = (cls: any, field: string) => IDeSerDefinition;
