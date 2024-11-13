module.exports = {
  "parserOptions": {
    "jsx": true
  },
  "extends": [
    "next/core-web-vitals",
    "next/typescript"
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react/button-has-type": "error",
    "react/default-props-match-prop-types": "error",
    "react/destructuring-assignment": "off",
    "react/display-name": "off",
    "react/hook-use-state": "error",
    "react/jsx-boolean-value": "off",
    "react/jsx-child-element-spacing": "error",
    "react/jsx-closing-bracket-location": [
      "error",
      {
        nonEmpty: "after-props",
        selfClosing: "tag-aligned"
      }
    ],
    "react/jsx-closing-tag-location": "error",
    "react/jsx-curly-brace-presence": "off",
    "react/jsx-curly-newline": [
      "error",
      {
        multiline: "consistent",
        singleline: "forbid"
      }
    ],
    "react/jsx-curly-spacing": [
      "error",
      {
        children: true,
        when: "never"
      }
    ],
    "react/jsx-equals-spacing": ["error", "never"],
    "react/jsx-filename-extension": [
      "error",
      {
        allow: "as-needed",
        extensions: [".jsx", ".tsx"]
      }
    ],
    "react/jsx-first-prop-new-line": [
      "error",
      "multiline-multiprop"
    ],
    "react/jsx-fragments": "off",
    "react/jsx-handler-names": "off",
    "react/jsx-indent": ["error", 2],
    "react/jsx-indent-props": ["error", 2],
    "react/jsx-key": [
      "error",
      {
        checkFragmentShorthand: false,
        checkKeyMustBeforeSpread: true,
        warnOnDuplicates: true
      }
    ],
    "react/jsx-max-props-per-line": [
      "error",
      {
        maximum:
          {
            multi: 1,
            single: 3
          }
      }
    ],
    "react/jsx-newline": ["error", { prevent: true }],
    "react/jsx-no-comment-textnodes": "error",
    "react/jsx-no-constructed-context-values": "error",
    "react/jsx-no-duplicate-props": "error",
    "react/jsx-no-script-url": "error",
    "react/jsx-no-target-blank": "error",
    "react/jsx-no-undef": "error",
    "react/jsx-no-useless-fragment": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-pascal-case": "error",
    "react/jsx-props-no-multi-spaces": "error",
    "react/jsx-tag-spacing": [
      "error",
      {
        afterOpening: "never",
        beforeClosing: "never",
        beforeSelfClosing: "never",
        closingSlash: "never"
      }
    ],
    "react/jsx-uses-vars": "error",
    "react/jsx-wrap-multilines": [
      "error",
      {
        "declaration": "parens-new-line",
        "assignment": "parens-new-line",
        "return": "parens-new-line",
        "arrow": "parens-new-line",
        "condition": "parens-new-line",
        "logical": "parens-new-line",
        "prop": "parens-new-line"
      }
    ],
    "react/no-arrow-function-lifecycle": "error",
    "react/no-children-prop": "error",
    "react/no-danger-with-children": "error",
    "react/no-deprecated": "error",
    "react/no-direct-mutation-state": "error",
    "react/no-find-dom-node": "error",
    "react/no-is-mounted": "error",
    "react/no-multi-comp": "off",
    "react/no-namespace": "error",
    "react/no-redundant-should-component-update": "error",
    "react/no-render-return-value": "error",
    "react/no-string-refs": "error",
    "react/no-this-in-sfc": "error",
    "react/no-typos": "error",
    "react/no-unescaped-entities": "error",
    "react/no-unknown-property": [
      "error",
      {
        "ignore": ["css", "global", "jsx"]
      }
    ],
    "react/no-unsafe": "error",
    "react/no-unstable-nested-components": "error",
    "react/no-unused-class-component-methods": "error",
    "react/no-unused-prop-types": "error",
    "react/no-unused-state": "error",
    "react/no-will-update-set-state": "error",
    "react/prefer-es6-class": "error",
    "react/prefer-read-only-props": "error",
    "react/prefer-stateless-function": "error",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
    "react/require-render-return": "error",
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true
      }
    ],
    "react/sort-comp": "error",
    "react/sort-prop-types": "error",
    "react/state-in-constructor": ["error", "never"],
    "react/style-prop-object": "error",
    "react/void-dom-elements-no-children": "error",
  },
  "overrides": [
    {
      "files": ["*.style.ts", "*.styles.ts"],
      "rules": {
        "@typescript-eslint/explicit-function-return-type": "off"
      }
    },
    {
      "files": ["**/pages/**/*"],
      "rules": {
        "import/no-unused-modules": "off"
      }
    }
  ]
};

