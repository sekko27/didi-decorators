# Decorators

## Init methods

You can decorate methods with @InitMethodDecorators.Init() decorators for init-method activation handlers. 
The decorated methods will be sorted according the positioning definitions: for positioning you can reference other methods by their name.

For example:

```typescript
import { Init } from "./mod.ts";

class BeanClass {
    @Init(p => p.after("init2"))
    public init1() {}
    
    @Init()
    public init2() {}
    
    @Init(p => p.before("init2"))
    public init3() {}
}
```

In this case the activation handler must call the init methods in order: init3, init2, init1.
