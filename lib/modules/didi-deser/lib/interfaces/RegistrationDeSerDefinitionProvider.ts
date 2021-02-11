import { IDeSerDefinition } from "./IDeSerDefinition.ts";

export type RegistrationDeSerDefinitionProvider = (prototype: any, field: string) => IDeSerDefinition;
