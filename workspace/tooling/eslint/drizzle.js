module.exports = {
  "plugins": [
  ],
  "extends": [
    "plugin:drizzle/recommended"
  ],
  "rules": {
    "drizzle/enforce-delete-with-where": [
      "error",
      {
        "drizzleObjectName": "db"
      }
    ],
    "drizzle/enforce-update-with-where": [
      "error",
      {
        "drizzleObjectName": "db"
      }
    ],
  }
};
