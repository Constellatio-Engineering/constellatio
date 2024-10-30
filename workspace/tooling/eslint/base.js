module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module"
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  },
  "ignorePatterns": [
    "*.js",
    "*.jsx",
    "*.d.ts",
    "webpack.*",
    "coverage",
    "dist",
    "build",
    "node_modules"
  ],
  "plugins": [
    "@typescript-eslint",
    "typescript-sort-keys",
    "import",
    "newline-destructuring",
    "sort-destructure-keys",
    "sort-keys-fix",
    "prefer-arrow",
    "barrel-files"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  "rules": {
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/array-type": [
      "error",
      {
        "default": "array-simple"
      }
    ],
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/ban-types": "error",
    "@typescript-eslint/brace-style": [
      "error",
      "allman",
      {
        allowSingleLine: true
      }
    ],
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        "prefer": "type-imports",
        "fixStyle": "inline-type-imports"
      }
    ],
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/consistent-type-definitions": "off",
    /*"@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true
      }
    ],*/
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      {
        accessibility: "explicit"
      }
    ],
    "@typescript-eslint/indent": [
      "error",
      2,
      {
        FunctionDeclaration: {
          parameters: "first"
        },
        FunctionExpression: {
          parameters: "first"
        },
        ObjectExpression: 1,
        SwitchCase: 1
      }
    ],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "semi",
          requireLast: true
        },
        singleline: {
          delimiter: "semi",
          requireLast: false
        }
      }
    ],
    "@typescript-eslint/member-ordering": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "format": ["camelCase", "PascalCase"],
        "leadingUnderscore": "allow",
        "filter": {
          "regex": "^f_|^q_",
          "match": false
        },
        "selector": [
          "variable",
          "parameter",
          "classProperty",
          "typeProperty"
        ]
      },
      {
        "format": ["PascalCase"],
        "leadingUnderscore": "allow",
        "prefix": [
          "is",
          "should",
          "has",
          "can",
          "was",
          "were",
          "have",
          "do",
          "must",
          "does",
          "would",
          "did",
          "will",
          "may",
          "could",
          "might",
          "cant",
          "wont",
          "are"
        ],
        "selector": [
          "variable",
          "parameter",
          "classProperty",
          "typeProperty"
        ],
        "types": ["boolean"]
      },
      {
        "custom": {
          "match": true,
          "regex": "^e[A-Z]"
        },
        "format": ["strictCamelCase"],
        "selector": "enum"
      },
      {
        "format": ["strictCamelCase"],
        "selector": "enumMember"
      }
    ],
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-extra-parens": "off",
    "@typescript-eslint/no-extra-semi": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-namespace": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/no-require-imports": "off",
    "@typescript-eslint/no-unused-expressions": [
      "error"
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_",
        "ignoreRestSiblings": true
      }
    ],
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/no-useless-constructor": "error",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/prefer-namespace-keyword": "error",
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/quotes": [
      "error",
      "double"
    ],
    "@typescript-eslint/require-await": "error",
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/return-await": "error",
    "@typescript-eslint/semi": [
      "error",
      "always"
    ],
    "@typescript-eslint/space-before-function-paren": [
      "error",
      {
        anonymous: "never",
        asyncArrow: "always",
        named: "never"
      }
    ],
    "@typescript-eslint/switch-exhaustiveness-check": [
      "error",
      {
        "allowDefaultCaseForExhaustiveSwitch": true,
        "requireDefaultForNonUnion": true
      }
    ],
    "@typescript-eslint/triple-slash-reference": "error",
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/unified-signatures": "error",
    "array-bracket-spacing": [
      "error",
      "never"
    ],
    "arrow-body-style": "off",
    "arrow-parens": [
      "off",
      "as-needed"
    ],
    "arrow-spacing": [
      "error",
      {
        after: true,
        before: true
      }
    ],
    "barrel-files/avoid-importing-barrel-files": "off",
    "barrel-files/avoid-barrel-files": "error",
    "barrel-files/avoid-namespace-import": [
      "error",
      {
        "allowList": ["./schema"]
      }
    ],
    "barrel-files/avoid-re-export-all": "error",
    "block-scoped-var": "error",
    "block-spacing": [
      "error",
      "always"
    ],
    "brace-style": "off",
    "callback-return": [
      "error",
      [
        "callback",
        "cb",
        "next"
      ]
    ],
    "comma-dangle": "off",
    "comma-spacing": [
      "error",
      {
        after: true,
        before: false
      }
    ],
    "complexity": "off",
    "constructor-super": "error",
    "curly": "error",
    "dot-notation": "error",
    "eol-last": "error",
    "eqeqeq": [
      "error",
      "smart"
    ],
    "guard-for-in": "error",
    "id-blacklist": "off",
    "id-match": "off",
    "import/no-duplicates": "error",
    "import/no-deprecated": "error",
    "import/no-extraneous-dependencies": "error",
    /*"import/no-unused-modules": [
      "warn",
      {
        "unusedExports": true,
        "missingExports": true
      }
    ],*/
    "import/no-unused-modules": "off",
    "import/order": [
      "error",
      {
        alphabetize: {
          caseInsensitive: true,
          order: "asc"
        },
        groups: [
          "internal",
          "external",
          "builtin",
          [
            "sibling",
            "parent"
          ],
          "index"
        ],
        "newlines-between": "always"
      }
    ],
    "indent": "off",
    "key-spacing": [
      "error",
      {
        afterColon: true,
        beforeColon: false,
        mode: "strict"
      }
    ],
    "keyword-spacing": [
      "error",
      {
        after: true,
        before: true,
        overrides: {
          for: {
            after: false
          },
          if: {
            after: false
          },
          while: {
            after: false
          }
        }
      }
    ],
    "linebreak-style": "off",
    "max-classes-per-file": [
      "error",
      1
    ],
    "max-len": [
      "error",
      {
        code: 180,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreUrls: true,
        tabWidth: 2,
        ignoreComments: true,
        ignoreTemplateLiterals: true
      }
    ],
    "max-lines": [
      "error",
      {
        max: 180,
        skipBlankLines: true,
        skipComments: true
      }
    ],
    "new-parens": "error",
    "newline-per-chained-call": "off",
    "newline-destructuring/newline": [
      "error",
      {
        "items": 3,
        "itemsWithRest": 1,
        "maxLength": 140
      }
    ],
    "no-bitwise": "error",
    "no-caller": "error",
    "no-case-declarations": "off",
    "no-cond-assign": "error",
    "no-console": "off",
    "no-debugger": "error",
    "no-duplicate-imports": "off",
    "no-empty": "error",
    "no-empty-function": "off",
    "no-eval": "error",
    "no-extra-parens": "off",
    "no-extra-semi": "off",
    "no-fallthrough": "off",
    "no-invalid-this": "off",
    "no-multi-assign": "error",
    "no-multi-spaces": [
      "error",
      {
        ignoreEOLComments: true
      }
    ],
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1
      }
    ],
    "no-nested-ternary": "off",
    "no-new-wrappers": "error",
    "no-return-await": "off",
    "no-template-curly-in-string": "error",
    "no-throw-literal": "error",
    "no-trailing-spaces": "off",
    "no-undef-init": "error",
    "no-underscore-dangle": "off",
    "no-unsafe-finally": "error",
    "no-unused-expressions": "off",
    "no-unused-labels": "error",
    "no-unused-vars": "off",
    "no-use-before-define": "off",
    "no-useless-constructor": "off",
    "no-var": "error",
    "no-whitespace-before-property": "error",
    "object-curly-newline": [
      "error",
      {
        "ExportDeclaration": {
          "consistent": true,
          "minProperties": 5,
          "multiline": true
        },
        "ImportDeclaration": {
          "consistent": true,
          "minProperties": 5,
          "multiline": true
        },
        "ObjectExpression": {
          "consistent": true,
          "minProperties": 4,
          "multiline": true
        },
        "ObjectPattern": {
          "consistent": true,
          "minProperties": 4,
          "multiline": true
        }
      }
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "object-shorthand": "error",
    "object-property-newline": [
      "error",
      {
        "allowAllPropertiesOnSameLine": true
      }
    ],
    "one-var": [
      "error",
      "never"
    ],
    "padding-line-between-statements": [
      "off",
      {
        blankLine: "always",
        next: "return",
        prev: "*"
      }
    ],
    "prefer-arrow/prefer-arrow-functions": "off",
    "prefer-const": "error",
    "prefer-destructuring": [
      "error",
      {
        "VariableDeclarator": {
          "array": false,
          "object": true
        },
        "AssignmentExpression": {
          "array": false,
          "object": false
        }
      },
      {
        "enforceForRenamedProperties": false
      }
    ],
    "quote-props": [
      "error",
      "as-needed"
    ],
    "quotes": "off",
    "radix": "off",
    "require-await": "off",
    "semi": "off",
    "semi-spacing": [
      "error",
      {
        after: true,
        before: false
      }
    ],
    "sort-destructure-keys/sort-destructure-keys": [
      "error",
      {
        caseSensitive: false
      }
    ],
    "sort-keys-fix/sort-keys-fix": [
      "error",
      "asc",
      {
        "natural": true
      }
    ],
    "space-before-blocks": "error",
    "space-before-function-paren": "off",
    "space-infix-ops": [
      "error",
      {
        "int32Hint": false
      }
    ],
    "space-in-parens": "error",
    "spaced-comment": "error",
    "typescript-sort-keys/interface": "error",
    "typescript-sort-keys/string-enum": "error",
    "use-isnan": "error",
    "valid-typeof": "off",
    "vars-on-top": "error"
  }
};
