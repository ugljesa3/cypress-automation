# Cypress Test Automation - Sauce Demo

Automated end-to-end testing framework for [Sauce Demo](https://www.saucedemo.com) e-commerce application using Cypress and Page Object Model pattern.

## Technologies

- **Cypress** v14.5.4 - End-to-end testing framework
- **JavaScript** - Programming language
- **Page Object Model (POM)** - Design pattern for maintainable tests
- **Mochawesome Reporter** - HTML test reports
- **GitHub Actions** - CI/CD pipeline for automated test execution

## Project Structure

```
cypress/
├── e2e/                    # Test files
│   ├── cart.cy.js
│   ├── checkout.cy.js
│   ├── customer_informations.cy.js
│   ├── dropdownMenu.cy.js
│   ├── dropdownSorting.cy.js
│   ├── footer.cy.js
│   ├── login.cy.js
│   ├── productDetails.cy.js
│   └── smoke.cy.js         # Critical path / Smoke tests
├── pages/                  # Page Object Model classes
│   ├── cartPage.js
│   ├── checkoutPage.js
│   ├── customerPage.js
│   ├── footerComponent.js
│   ├── homePage.js
│   └── loginPage.js
├── fixtures/               # Test data (JSON)
│   ├── customerData.json
│   ├── loginData.json
│   └── productsData.json
└── support/
    ├── commands.js         # Custom Cypress commands
    └── e2e.js             # Global configurations
```

## Architecture

### Design Pattern: Page Object Model (POM)
Project follows POM pattern for maintainability and scalability:
- **Pages**: Encapsulate UI element selectors and page-specific actions (`cypress/pages/`)
- **Tests**: Contain test logic and assertions only (`cypress/e2e/`)
- **Fixtures**: External test data in JSON format for data-driven testing (`cypress/fixtures/`)

This separation ensures that UI changes require updates in only one location (Page class), not across multiple test files.

## Test Plan

### Test Strategy
| Type | Coverage | Files |
|------|----------|-------|
| Smoke | Critical user flows (login, checkout) | `smoke.cy.js` |
| E2E | Complete end-to-end scenarios | `e2e.cy.js` |

### Test Categories
- **Functional**: UI interactions, form validation, business logic
- **E2E**: Complete user journeys (login → cart → checkout)
- **Negative**: Error handling, invalid inputs, edge cases
- **Cross-browser**: Chrome, Firefox compatibility

### Test Techniques Applied

**Smoke Testing:**
- Authentication flows
- Basic functionality verification

**Functional Testing:**
- Positive testing (valid inputs)
- Negative testing (invalid inputs, error handling)
- End-to-End testing (full user flows)

**Non-Functional Testing:**
- Browser navigation testing
- Responsive / Mobile view testing

**UI/UX Testing:**
- Element visibility and presence
- Label and text verification
- External links validation

## Test Coverage

### Login Suite
- Valid/invalid credentials
- Logout functionality
- Input validation (empty fields, special characters)
- Session handling

### Product & Cart
- Product listing and details
- Add/remove products from cart
- Cart persistence (refresh, back/forward navigation)
- Quantity verification

### Checkout Flow
- Customer information form validation
- Price calculations
- Complete purchase flow
- Cancel functionality

### UI Components
- Dropdown menu (All Items, About, Reset App, Logout)
- Sorting options (A-Z, Z-A, Price)
- Footer links (Social media)
- Responsive behavior

## Installation

```bash
# Clone repository
git clone https://github.com/ugljesa3/cypress-automation.git  

# Navigate to project
cd cypress-automation

# Install dependencies
npm install
```

## Running Tests

```bash
# Open Cypress Test Runner (interactive mode)
npm run cy:open

# Run all tests in headless mode
npm run cy:run

# Run in specific browser
npm run cy:run:chrome
npm run cy:run:firefox
```

## CI/CD Pipeline

This project uses **GitHub Actions** for continuous integration:

- **Trigger**: Tests run automatically on every push to the main branch
- **Browser**: Chrome (headless)
- **Reports**: HTML reports generated as build artifacts
- **Artifacts**: Screenshots and videos uploaded on test failure

[View CI Status](../../actions)

## Running Tests Locally

```bash
# Install dependencies
npm install

# Run all tests (headless)
npm run cy:run

# Run with HTML report
npm run cy:run -- --reporter mochawesome

# Open interactive mode for debugging
npm run cy:open

# Run in specific browser
npm run cy:run:chrome
npm run cy:run:firefox
```

## Known Issues

The following tests are currently skipped due to application bugs (not test failures):

| Test | Location | Bug Description |
|------|----------|-----------------|
| Continue to payment with numbers | customer_informations.cy.js | Application accepts numeric input in name fields |
| Continue to payment with special characters | customer_informations.cy.js | Application accepts special characters in name fields |
| Reset app state | dropdownMenu.cy.js | Reset option does not clear cart items |
| Close dropdown by clicking outside | dropdownMenu.cy.js | Dropdown remains open when clicking outside |
| Login back/forward navigation | login.cy.js | User remains logged in after browser navigation |

## Author

Ugljesa Jankovic
