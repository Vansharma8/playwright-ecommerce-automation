# 🎭 Playwright E-Commerce Automation

A production-grade test automation framework built with **Playwright + JavaScript**, covering end-to-end UI flows, REST API validation, and cross-browser testing for [AutomationExercise.com](https://automationexercise.com).

---

## 🚀 What's Inside

- **Page Object Model (POM)** architecture for clean, maintainable test code
- **UI Tests** covering the full e-commerce journey — login → browse → cart → checkout → payment
- **API Tests** validating 14 REST endpoints across authentication, products, brands, search, and user management
- **Cross-browser** execution on Chromium, Firefox, and WebKit (Safari)
- **CI/CD pipeline** via GitHub Actions — runs on every push with HTML report artifacts
- **Smart tagging** system for selective test execution (`@smoke`, `@regression`, `@positive`, `@negative`)

---

## 🗂️ Project Structure

```
playwright-ecommerce-automation/
│
├── pages/                        # Page Object Model
│   ├── LoginPage.js
│   ├── ProductPage.js
│   ├── ProductDetailPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   └── CommonPage.js             # Shared components (modals etc.)
│
├── tests/
│   ├── ui/                       # UI end-to-end tests
│   │   ├── auth.spec.js
│   │   ├── products.spec.js
│   │   ├── productdetailpage.spec.js
│   │   ├── cart.spec.js
│   │   └── checkout.spec.js
│   │
│   └── api/                      # REST API tests
│       ├── auth_API.spec.js
│       ├── brands_API.spec.js
│       ├── products_API.spec.js
│       ├── search_API.spec.js
│       └── users_API.spec.js
│
├── .github/workflows/            # CI/CD pipeline
├── playwright.config.js
└── package.json
```

---

## 🧪 Test Coverage

### UI Tests

| Module | What's Tested |
|--------|--------------|
| **Authentication** | Valid login, invalid credentials, error message validation |
| **Products** | Page load, product search, add to cart, category & brand filtering |
| **Product Details** | Product info verification, quantity selection, add to cart from detail page |
| **Cart** | Multi-product cart, price & quantity validation, product deletion, grand total |
| **Checkout & Payment** | Address verification, payment form, successful payment flow, invoice download |

### API Tests — 14 Endpoints

| Module | Endpoints |
|--------|-----------|
| **Auth** | POST verify login (valid / invalid / missing param), DELETE login |
| **Products** | GET all products, POST to products |
| **Brands** | GET all brands, PUT to brands |
| **Search** | POST search product, POST search (missing param) |
| **Users** | POST create user, GET user by email, PUT update user, DELETE user |

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/Vansharma8/playwright-ecommerce-automation.git
cd playwright-ecommerce-automation

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests

```bash
# Run all tests
npx playwright test

# Run only UI tests
npx playwright test tests/ui/

# Run only API tests
npx playwright test tests/api/

# Run on a specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run by tag
npx playwright test --grep @smoke
npx playwright test --grep @regression
npx playwright test --grep @checkout
```

### View HTML Report

```bash
npx playwright show-report
```

---

## 🏷️ Test Tags

| Tag | Purpose |
|-----|---------|
| `@smoke` | Critical path — run first |
| `@regression` | Full suite |
| `@positive` | Happy path scenarios |
| `@negative` | Error & edge cases |
| `@auth` | Login / authentication |
| `@products` | Product browsing & search |
| `@cart` | Cart management |
| `@checkout` | Payment & order flow |
| `@download` | Invoice download |

---

## 🔄 CI/CD

Every push triggers the GitHub Actions pipeline which:
- Installs dependencies and Playwright browsers
- Runs the full test suite across all 3 browsers
- Uploads the HTML test report as a downloadable artifact

---

## 👨‍💻 Author

**Vansh Sharma**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/vansh-sharma-a77774223/)
[![GitHub](https://img.shields.io/badge/GitHub-Vansharma8-black?style=flat&logo=github)](https://github.com/Vansharma8)
