# Deserialization

```typescript
class A {
    @ConstructorPropertyDecorators.Inject()
    service: IService;
    
    @DeSer.Property()
    prop1: number;
    
    constructor(@DeSer.ConstructorProperty() public param1: number, @DeSer.ConstructorProperty() public param2: number = 0) {
        this.prop1 = param1 + param2;
    }

    @DeSer.Getter()
    get lala() {
    }

    @DeSer.Setter()
    set lala(value: string) {}
}

function deserialize<A>(serviceInjectedModelClass: BeanType<A>, source): A {
    // 1. resolve all constructor params
    // 1. call new
    // 1. set other properties (properties + setters)
}
```
