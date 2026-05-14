# Playwright E2E Test Automation Framework

A professional end-to-end test automation framework built with Playwright and JavaScript, testing the [Automation Exercise](https://automationexercise.com) e-commerce application.

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev) | Test automation framework |
| JavaScript | Programming language |
| Node.js | Runtime environment |
| Allure | Test reporting |
| Jenkins | CI/CD (self-hosted) |
| GitHub Actions | CI/CD (cloud) |

---

## 📋 Prerequisites

- Node.js v18+
- npm v8+

Verify installations:
```bash
node --version
npm --version
```

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/oadelua/playwright-ecommerce.git

# Navigate to project
cd playwright-ecommerce

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```
LOGIN_EMAIL=your@email.com
LOGIN_PASSWORD=yourpassword
REGISTER_PASSWORD=yourpassword
```

> ⚠️ Never commit `.env` to GitHub — it's in `.gitignore`

---

## 🚀 Running Tests

```bash
# Run all tests
npx playwright test

# Run on specific browser
npx playwright test --project=chromium

# Run smoke tests only
npx playwright test --grep @smoke --project=chromium

# Run regression tests only
npx playwright test --grep @regression --project=chromium

# Run API tests only
npx playwright test --grep @api --project=chromium

# Run visual regression tests
npx playwright test --grep @visual --project=chromium

# Run specific spec file
npx playwright test tests/auth/auth.spec.js --project=chromium

# Run in headed mode
npx playwright test --project=chromium --headed

# Run last failed tests
npx playwright test --last-failed --project=chromium
```

---

## 📊 Test Reports

```bash
# HTML Report
npx playwright show-report

# Allure Report
npx allure generate allure-results --clean
npx allure open
```

---

## 📁 Project Structure
```
playwright-ecommerce/
├── .github/
│   └── workflows/
│       └── playwright.yml    ← GitHub Actions CI
├── fixtures/
│   └── index.js              ← Reusable login fixture
├── pages/                    ← Page Object Models
│   ├── LoginPage.js
│   ├── SignUpPage.js
│   ├── ProductPage.js
│   └── CartPage.js
├── tests/
│   ├── auth/                 ← Authentication tests
│   │   ├── auth.spec.js
│   │   └── api-ui.spec.js
│   ├── products/             ← Product & cart tests
│   │   └── products.spec.js
│   ├── api/                  ← API tests
│   │   └── api.spec.js
│   └── visual/               ← Visual regression tests
│       └── visual.spec.js
├── utils/
│   └── apiUtils.js           ← Reusable API helpers
├── .env                      ← Environment variables (not committed)
├── .gitignore
├── Jenkinsfile               ← Jenkins pipeline
├── playwright.config.js      ← Playwright configuration
└── README.md
```
---

## 🏷️ Test Tags

| Tag | Description | When to run |
|---|---|---|
| `@smoke` | Critical path tests | After every deployment |
| `@regression` | Full test suite | Nightly |
| `@api` | API tests | After API changes |
| `@visual` | Visual regression | After UI changes |

---

## 🔄 CI/CD

### GitHub Actions
- Triggers on every push to `main`
- Triggers on pull requests
- Scheduled daily at 6am
- Secrets managed via GitHub Secrets

### Jenkins
- Self-hosted pipeline
- Separate smoke and regression stages
- HTML report published after each run
- Scheduled nightly at midnight

---

## 🌐 Browser Support

| Browser | Status |
|---|---|
| Chromium | ✅ Active |
| Firefox | ✅ Active |
| WebKit | ⚠️ Pending (ad handling fix) |

---

## 👨‍💻 Author

**Oluwatobi Adelua**
QA Engineer 
[GitHub](https://github.com/oadelua)