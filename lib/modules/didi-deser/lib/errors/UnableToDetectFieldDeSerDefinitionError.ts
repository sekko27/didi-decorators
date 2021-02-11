export class UnableToDetectFieldDeSerDefinitionError extends Error {
    constructor(readonly prototype: any, readonly field: string) {
        super(`Unable to detect de-ser definition for field "${field}" within class ${prototype.constructor.name} - we support primitive and annotated class auto-detection only`);
    }
}
