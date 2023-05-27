import { nodeBindings } from "./node-bindings";

describe("nodeBindings", () => {
  it("should work", () => {
    expect(nodeBindings()).toEqual("node-bindings");
  });
});
