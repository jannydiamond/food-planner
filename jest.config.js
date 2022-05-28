module.exports = {
  rootDir: 'src',
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^server$': '<rootDir>/server',
    '^server/(.*)$': '<rootDir>/server/$1',
  },
  resolver: 'ts-jest-resolver',
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ]
}
