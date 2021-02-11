import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";
import { DecoratorSupport } from "../../../../../../mod.ts";
import { InvalidFieldDeSerDefinitionError } from "../../errors/InvalidFieldDeSerDefinitionError.ts";

export class DeSerValidation {
    public static validateFieldDefinition<T extends IDeSerDefinition>(prototype: any, field: string, definition: T): T {
        const type = DecoratorSupport.fieldType(prototype, field);
        try {
            return definition.validateType(type);
        } catch (err) {
            throw new InvalidFieldDeSerDefinitionError(prototype, field, err);
        }
    }
}
