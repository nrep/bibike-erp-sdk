# Changelog

All notable changes to the Bibike ERP TypeScript SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-01-25

### Changed - **BREAKING**
- SDK is now **100% auto-generated** from OpenAPI specification
- No manual wrapper code - zero maintenance burden
- Clean method names: `productsList()`, `productsCreate()`, `customersBalance()`
- Package exports directly from generated code

### Added
- **28 API classes** covering all Bibike ERP endpoints
- **100+ TypeScript models** with full type definitions
- GitHub Actions CI/CD:
  - GitHub Release → auto-publish to npm
  - Repository dispatch for OpenAPI spec changes
  - Manual trigger with optional publish

### Migration from v1.x

```typescript
// v1.x (manual SDK)
import { BibikeClient } from '@bibike/erp-sdk';
const client = new BibikeClient({ baseUrl: '...' });
const products = await client.products.list({ page: 1 });

// v2.x (auto-generated)
import { Configuration, ProductsApi } from '@bibike/erp-sdk';
const config = new Configuration({ basePath: '...', accessToken: 'token' });
const productsApi = new ProductsApi(config);
const products = await productsApi.productsList({ page: 1 });
```

---

## [1.1.7] - 2026-01-18

### Added
- Location management (warehouses, shops)
- POS session support
- Dashboard stats endpoint

### Fixed
- 2FA login flow handling
- Token refresh edge cases

---

## [1.1.0] - 2026-01-15

### Added
- Accounting module (accounts, journals, trial balance)
- HR module (employees, departments, attendance, leave)
- CRM module (leads, opportunities, activities)
- Webhook management

---

## [1.0.0] - 2025-12-26

### Added
- Initial release
- Authentication (login, logout, 2FA)
- Products CRUD
- Inventory management
- Sales and quotations
- Customers and suppliers
- Purchase orders
- Basic reports
