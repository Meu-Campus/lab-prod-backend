/** jest.config.js */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // remove useESM
  // transform continua igual
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
};
