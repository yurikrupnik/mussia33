import { nodeNestAuth } from "./node-nest-auth";

describe("nodeNestAuth", () => {
  it("should work", () => {
    expect(nodeNestAuth()).toEqual("node-nest-auth");
  });
});
