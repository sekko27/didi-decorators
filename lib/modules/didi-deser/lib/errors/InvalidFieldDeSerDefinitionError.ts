export class InvalidFieldDeSerDefinitionError extends Error {
    constructor(readonly cls: any, readonly field: string, readonly cause: Error) {
        super(`Invalid de-ser definition for field "${field}" within class "${cls.constructor.name}" - ${cause.message}`);
    }
}
