module.exports = {
  "extends": "airbnb-base",
  "env": {
    "browser": true,
    "es6": true,
    "jasmine": true,
  },
  "globals": {
    "Fingerprint2": "readonly",
  },
  "rules": {
    "arrow-body-style": 0,
    "linebreak-style": 0,
    "no-underscore-dangle": 0,
    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": [
        "**/*.spec.js",
        "./src/tests/**",
      ],
    }],
  },
  "settings": {
    "import/resolver": {
      "node": {
        "moduleDirectory": [
          "src",
          "node_modules",
        ],
      },
    },
  },
};
