github link https://github.com/Ramilia3110/car-race-ui
Checklist
1.UI Deployment (10 points):
2.Requirements to Commits and Repository (10 points):
3.Basic Structure (85 points):
View Configuration: 30 points
Garage View Functionality: 55 points
4.Car Animation (50 points)
5.Race Animation (35 points)
6.Winners View (45 points)
7.Application Architecture (40 points)
8.Dynamic Content Generation (30 points)
9.Single Page Application (25 points)
10.Bundling and Tooling (20 points)
11.Code Quality and Standards (15 points)
12.Code Organization and Efficiency (15 points)
13.Prettier and ESLint Configuration (10 points)
14.Overall Code Quality (35 points)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# car-race
