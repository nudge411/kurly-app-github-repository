module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "@": "./src",
          "@api": "./src/api",
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@constants": "./src/constants",
          "@hooks": "./src/hooks",
          "@screens": "./src/screens",
          "@store": "./src/store",
          "@types": "./src/types",
          "@utils": "./src/utils",
        },
      },
    ],
  ],
};
