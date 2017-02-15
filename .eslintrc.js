module.exports = {
    extends: "airbnb",
    plugins: [
        "react",
        "jsx-a11y",
        "import"
    ],
    settings: {
      'import/resolver': 'webpack'
    },
    env: {
      browser: true,
    }
};
