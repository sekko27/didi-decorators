import { DeSerDecorators } from "../base/DeSerDecorators.ts";
import { TransientDeSerDefinition } from "./TransientDeSerDefinition.ts";

const TRANSIENT_SINGLETON: TransientDeSerDefinition = new TransientDeSerDefinition();

export function Transient() {
    return DeSerDecorators.register(() => TRANSIENT_SINGLETON);
}
