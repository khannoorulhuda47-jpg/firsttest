# Playwright with Cucumber BDD

A modern testing framework combining **Playwright** for browser automation and **Cucumber** for Behavior-Driven Development (BDD) testing.

## Project Structure

```
├── features/                 # Gherkin feature files
│   └── login.feature        # Example feature file
├── step-definitions/        # Step implementation files
│   └── login.steps.ts       # Example step definitions
├── src/
│   └── helpers/
│       └── BrowserHelper.ts # Reusable browser utilities
├── playwright.config.ts     # Playwright configuration
├── cucumber.js              # Cucumber configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## Features

- 🎭 **Playwright** for cross-browser testing (Chromium, Firefox, WebKit)
- 🥒 **Cucumber** for BDD with Gherkin syntax
- 📝 **TypeScript** support for type-safe test code
- 📊 **HTML Reports** for test results
- 🎬 **Screenshots & Videos** on test failure
- ⚡ **Parallel Execution** support

## Installation

1. Install dependencies:
```bash
npm install
```

2. Ensure you have Node.js 16+ installed

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests with parallel execution
```bash
npm run test:parallel
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Generate HTML report
```bash
npm run test:report
```

## Writing Tests

### 1. Create a Feature File
Create `.feature` files in the `features/` directory with Gherkin syntax:

```gherkin
Feature: User Login
  Scenario: Successful login
    Given the user is on the login page
    When the user enters valid credentials
    And the user clicks the login button
    Then the user should be redirected to the dashboard
```

### 2. Implement Step Definitions
Create `.ts` files in the `step-definitions/` directory:

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { page } from './hooks';

Given('the user is on the login page', async () => {
  await page.goto('http://localhost:3000/login');
});
```

## Browser Helper Usage

Use the `BrowserHelper` utility for common operations:

```typescript
import { BrowserHelper } from '../src/helpers/BrowserHelper';

await BrowserHelper.initBrowser('chromium');
await BrowserHelper.navigateTo('http://example.com');
await BrowserHelper.fillInput('input[name="username"]', 'user@example.com');
await BrowserHelper.clickElement('button[type="submit"]');
await BrowserHelper.closeBrowser();
```

## Configuration

### Playwright Configuration (`playwright.config.ts`)
- Base URL: `http://localhost:3000`
- Reporters: HTML reports
- Screenshots and videos on failure
- Multi-browser support

### Cucumber Configuration (`cucumber.js`)
- Step definitions loading
- HTML and JSON report formats
- Async/await support

## Test Results

After running tests, view the reports:
- **HTML Report**: `test-results/cucumber-report.html`
- **JSON Report**: `test-results/cucumber-report.json`

## Best Practices

1. **Write descriptive scenarios** using Gherkin syntax
2. **Keep steps reusable** and avoid test-specific logic
3. **Use Page Object Model** for maintainability
4. **Handle waits explicitly** rather than using fixed delays
5. **Leverage tags** for organizing tests (`@smoke`, `@regression`, etc.)

## Debugging

To debug tests:
1. Use `npm run test:debug` to launch inspector
2. Add `await page.pause()` in step definitions
3. Check screenshots and videos in `test-results/`

## License

MIT
