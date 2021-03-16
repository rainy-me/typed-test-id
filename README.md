# typed-test-id

[![npm version](https://badge.fury.io/js/typed-test-id.svg)](https://badge.fury.io/js/typed-test-id)

This package links test ids used in frontend and selectors used in testing through types. Unlocks editor autocomplete and change detection. Powered by template literal types.

## Usage


default data attribute is `data-test-id`

```ts
type TestId = "username-input" | "password-input";

const { testId, selector } = createTestIdPair<TestId>();
```

Both `testId` and `selector` will be fully typed to const type.

```ts
selector("username-input"); // => "[data-test-id=username-input]"
testId("password-input"); // { "data-test-id": "password-input" }
```

if you want to use different data attribute, please provide it as a second type parameter in the generics.


 ```ts
 type TestId = "product-name" | "product-price";
 
 const { testId, selector } = createTestIdPair<TestId, "data-cy">("data-cy");

 selector("product-name"); // => "[data-cy=product-name]"
 testId("product-price"); // { "data-cy": "product-price" }
 ```