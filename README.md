# PlaywrightQAPractice

Minimal Playwright test suite for https://www.saucedemo.com.

## Quickstart

Prerequisites: Node.js (14+)

Install dependencies and browsers:
```bash
npm install
npx playwright install
```

Run tests:
- Run all tests (CLI): `npx playwright test`
- Run a single file: `npx playwright test tests/login.spec.ts`
- Run headed: `npx playwright test --headed`
- Run a specific project: `npx playwright test --project=chromium`

Open HTML report:
```bash
npx playwright show-report
```

Custom npm scripts
- See available scripts in [package.json](package.json). Run any script with:
```bash
npm run <script-name>
```
- Available ones: 
```bash
npm run test
npm run report
npm run testHeaded
```


Useful files
- Test specs: [tests/](tests)
- Page objects: [pages/](pages)
- Test data: [Data/](Data)
- Playwright config: [playwright.config.ts](playwright.config.ts)