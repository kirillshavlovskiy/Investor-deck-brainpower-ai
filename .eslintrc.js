module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/no-unused-expressions': 'off'
  }
} 