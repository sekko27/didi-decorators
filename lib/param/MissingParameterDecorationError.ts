export class MissingParameterDecorationError extends Error {
    constructor(target: any, methodName: string | symbol) {
        super(
            `E_MISSING_PARAM_DECORATION: No decorator has been found on method
            ${target.name}.${methodName === undefined ? "constructor" : String(methodName)}.
            Use the fake @FactoryMethod decorator.`,
        );
    }
}
