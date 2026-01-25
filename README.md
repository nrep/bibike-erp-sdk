# Bibike ERP TypeScript SDK

Official TypeScript SDK for the Bibike ERP API. **100% Auto-generated from OpenAPI specification.**

[![npm version](https://badge.fury.io/js/@bibike%2Ferp-sdk.svg)](https://www.npmjs.com/package/@bibike/erp-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🔄 **100% Auto-generated** from OpenAPI 3.0 specification - zero manual code
- 📦 **Full TypeScript support** with complete type definitions
- 🎯 **28 API classes** covering all Bibike ERP endpoints
- 🔐 **Authentication** via Bearer tokens
- ⚡ **Tree-shakeable** ESM and CommonJS builds
- 🚀 **CI/CD** - GitHub release automatically publishes to npm

## Installation

```bash
npm install @bibike/erp-sdk
# or
yarn add @bibike/erp-sdk
# or
pnpm add @bibike/erp-sdk
```

## Quick Start

```typescript
import { Configuration, Authentication, Products } from '@bibike/erp-sdk';

// Create configuration
const config = new Configuration({
  basePath: 'https://bibike.fivorana.com/api.php',
});

// Login
const auth = new Authentication(config);
const { token } = await auth.login({
  loginRequest: { login: 'user@example.com', password: 'secret' },
});

// Use the token for authenticated requests
const authedConfig = new Configuration({
  basePath: 'https://bibike.fivorana.com/api.php',
  accessToken: token,
});

// Clean, intuitive API
const products = new Products(authedConfig);
await products.list({ page: 1, perPage: 20 });
await products.get({ id: 123 });
await products.create({ ... });
await products.update({ id: 123, ... });
```

## Usage Examples

### Products

```typescript
const products = new Products(config);

await products.list({ page: 1, perPage: 20, search: 'laptop' });
await products.get({ id: 123 });
await products.create({ ... });
await products.update({ id: 123, ... });
```

### Customers

```typescript
const customers = new Customers(config);

await customers.list({ search: 'john' });
await customers.get({ id: 123 });
await customers.create({ ... });
await customers.balance({ id: 123 });
```

### Sales

```typescript
const sales = new Sales(config);

await sales.list({ startDate: '2024-01-01', endDate: '2024-12-31' });
await sales.create({ ... });
```

## Available Classes

```typescript
import {
  Accounting,
  Authentication,
  CRM,
  Customers,
  GPTActions,
  HR,
  Inventory,
  InventoryExtended,
  Locations,
  Organizations,
  Permissions,
  POSReports,
  Products,
  PurchaseOrders,
  PurchasingExtended,
  Roles,
  Sales,
  SalesExtended,
  Shops,
  Suppliers,
  Sync,
  Transactions,
  Units,
  Users,
  Warehouses,
  Webhooks,
} from '@bibike/erp-sdk';
```

## Configuration

```typescript
import { Configuration } from '@bibike/erp-sdk';

// Basic configuration
const config = new Configuration({
  basePath: 'https://bibike.fivorana.com/api.php',
});

// With authentication token
const authenticatedConfig = new Configuration({
  basePath: 'https://bibike.fivorana.com/api.php',
  accessToken: 'your-api-token',
});

// With custom headers
const customConfig = new Configuration({
  basePath: 'https://bibike.fivorana.com/api.php',
  accessToken: 'your-api-token',
  headers: { 'X-Custom-Header': 'value' },
});
```

## Error Handling

```typescript
try {
  const product = await productsApi.productsView({ id: 999 });
} catch (error) {
  if (error instanceof Response) {
    console.error('Status:', error.status);
    const body = await error.json();
    console.error('Error:', body.error?.message);
  }
}
```

## Regenerating the SDK

The SDK is auto-generated from the OpenAPI specification. To regenerate:

```bash
# Clone the SDK repo
git clone https://github.com/nrep/bibike-erp-sdk.git
cd bibike-erp-sdk

# Install dependencies
npm install

# Validate the OpenAPI spec
npm run generate:validate

# Generate the SDK
npm run generate

# Build
npm run build:only

# Test
npm test
```

### CI/CD

- **GitHub Release** → Automatically publishes to npm
- **Repository Dispatch** → Triggers regeneration when OpenAPI spec changes
- **Manual Trigger** → Run workflow manually with optional npm publish

## Contributing

The SDK is **100% auto-generated**. To contribute:

1. Update the OpenAPI specification in the main Bibike repo
2. Trigger SDK regeneration via GitHub Actions
3. Create a GitHub Release to publish to npm

**Note**: All code in this repo is auto-generated. Do not edit manually.

## License

MIT
