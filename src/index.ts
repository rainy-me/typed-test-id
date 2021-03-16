export interface TestIdPair<
  DataTestAttribute extends `data-${string}` = never,
  TestIdCollection extends string = never
> {
  /**
   *
   * @param id test id
   */
  testId<TestId extends TestIdCollection>(
    id: TestId
  ): {
    [_ in DataTestAttribute]: TestId;
  };
  /**
   *
   * @param id test id
   */
  selector<TestId extends TestIdCollection>(
    id: TestId
  ): `[${DataTestAttribute}=${TestId}]`;
}

/**
 *
 * data attribute is default to `data-test-id`
 * 
 * if you want to use different data attribute, please provide it as a second type parameter in the generics.
 * @example
 * 
 * ```ts
 * type TestId = "username-input" | "password-input";
 * 
 * const { testId, selector } = createTestIdPair<TestId>();
 * ```
 * 
 * Both `testId` and `selector` will be fully typed to const type.
 * 
 * ```ts
 * selector("username-input"); // => "[data-test-id=username-input]"
 * testId("password-input"); // { "data-test-id": "password-input" }
 * ```
 */
// @ts-expect-error
// suppress implementation type not match error
export function createTestIdPair<
  TestIdCollection extends string = never
>(): TestIdPair<"data-test-id", TestIdCollection>;

/**
 * @param dataTestAttribute data attribute to use
 * 
 * @example
 * 
 * ```ts
 * type TestId = "product-name" | "product-price";
 * 
 * const { testId, selector } = createTestIdPair<TestId, "data-cy">("data-cy");
 * ```
 * 
 * Both `testId` and `selector` will be fully typed to const type
 * 
 * ```ts
 * selector("product-name"); // => "[data-cy=product-name]"
 * testId("product-price"); // { "data-cy": "product-price" }
 * ```
 */
export function createTestIdPair<
  TestIdCollection extends string = never,
  DataTestAttribute extends `data-${string}` = never
>(
  dataTestAttribute: DataTestAttribute
): TestIdPair<DataTestAttribute, TestIdCollection>;

export function createTestIdPair(dataTestAttribute = `data-test-id`) {
  return {
    testId(id: any) {
      return { [dataTestAttribute]: id };
    },
    selector(id: any) {
      return `[${dataTestAttribute}=${id}]` as const;
    },
  };
}
