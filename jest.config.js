module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}', '!<rootDir>/src/**/index.ts', '!<rootDir>/src/main/**/*', '!**/*.d.ts'],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/src/main/config/jest-setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest',
    '.+\\.(svg|jpg)$': '<rootDir>/fileTransformer.js'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
};
