/* eslint-disable */
export default {
  displayName: "node-nest-app",
  preset: "../../../jest.preset.js",
  testEnvironment: "node",
  transform: {
    "^.+\\.[tj]s$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.spec.json" }],
  },
  moduleFileExtensions: ["ts", "js", "html"],
  coverageDirectory: "../../../coverage/apps/node/nest-app",
};
