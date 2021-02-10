import { IDeSerDefinition } from "../../interfaces/IDeSerDefinition.ts";
import { DecoratorSupport } from "../../../../../../mod.ts";
import { InvalidFieldDeSerDefinitionError } from "../../errors/InvalidFieldDeSerDefinitionError.ts";

export class DeSerValidation {
    public static validateFieldDefinition<T extends IDeSerDefinition>(cls: any, field: string, definition: T): T {
        const type = DecoratorSupport.fieldType(cls, field);
        try {
            return definition.validateType(type);
        } catch (err) {
            throw new InvalidFieldDeSerDefinitionError(cls, field, err);
        }
    }
}
