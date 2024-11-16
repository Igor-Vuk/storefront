# STOREFRONT

Moguči problemi:

Prilikom otvaranja detalja o proizvodu, učitavanje slika može biti sporo. To je zato što Slike se dolaze sa CDN-a i nepotrebno su velike.

Link:

![alt text](Botinec.png)

## How to use it?

1. run `npm install`
2. run `npm run dev`
3. project will automatically open in your browser
4. to **view it on mobile**, after running `npm install` look for the **Network** address in the console.
5. run `npm run build` to build for deployment. This will also create `stats.html` file which is a **Rollup Visualizer** that we can open in any browser
6. `npm run preview` to locally preview the production build

7. `npm run test` to run vitest
8. `npm run coverage` to generate coverage report

## What does it include?

- `typescript`
- `tailwindcss` for custom styles
- `shadcnui` library for css components
- `vite` and `vite.config.js` file. `Rollup` is used for bundling
- `tests`configured tests(vitest) for use with typescript. Added node.js.yml file to trigger github actions and run tests on push to main branch.
- `eslint` configured with custom rules
