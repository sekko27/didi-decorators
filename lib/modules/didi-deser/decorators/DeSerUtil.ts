export class DeSerUtil {
    public static propertyNames(instance: any): string[] {
        return DeSerUtil.walkOnPrototypes(instance, (proto) => {
                return DeSerUtil.getPropertyDescriptorsAsArray(proto)
                    .filter(DeSerUtil.isPropertyFilter)
                    .map(([name]) => name)
            }
        );
    }

    public static walkOnPrototypes<T>(instance: any, iteratee: (proto: any) => T[]): T[] {
        const result: T[] = [];
        for (let current = instance; current !== null && current.constructor !== null; current = Object.getPrototypeOf(current)) {
            result.push(...iteratee(current));
        }
        return result;
    }


    public static isPropertyFilter([name, descriptor]: [string, PropertyDescriptor]): boolean {
        return name !== "constructor" && descriptor.set === undefined && descriptor.get === undefined;
    }

    public static getPropertyDescriptorsAsArray(instance: any): [string, PropertyDescriptor][] {
        return Array.from(Object.entries(Object.getOwnPropertyDescriptors(instance)));
    }

}
