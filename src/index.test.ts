import { createTestIdPair } from ".";

describe("createTestIdPair", () => {
  it("creates pair with default test attribute", () => {
    type TestId = "xxxx" | "yyyy";

    const { testId, selector } = createTestIdPair<TestId>();

    expect(testId("xxxx")).toMatchInlineSnapshot(`
      Object {
        "data-test-id": "xxxx",
      }
    `);
    expect(selector("xxxx")).toMatchInlineSnapshot(`"[data-test-id=xxxx]"`);

    const [buildSelector] = Object.entries(testId("yyyy")).map(
      ([key, val]) => `[${key}=${val}]`
    );
    expect(buildSelector).toBe(selector("yyyy"));
  });

  it("creates pair with custom test attribute", () => {
    type TestId = "aaaa" | "bbbb";

    const { testId, selector } = createTestIdPair<TestId, "data-cy">("data-cy");

    expect(testId("aaaa")).toMatchInlineSnapshot(`
      Object {
        "data-cy": "aaaa",
      }
    `);
    expect(selector("aaaa")).toMatchInlineSnapshot(`"[data-cy=aaaa]"`);

    const [buildSelector] = Object.entries(testId("bbbb")).map(
      ([key, val]) => `[${key}=${val}]`
    );
    expect(buildSelector).toBe(selector("bbbb"));
  });
});
