# Bibike ERP TypeScript SDK

Official TypeScript SDK for the Bibike ERP API.

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
import { BibikeClient } from '@bibike/erp-sdk';

const client = new BibikeClient({
  baseUrl: 'https://bibike.fivorana.com/api.php',
});

// Login
const auth = await client.login({
  email: 'user@example.com',
  password: 'password123',
});

console.log('Logged in as:', auth.user.full_name);

// Or use an existing token
client.setToken('your-api-token');
```

## Usage Examples

### Products

```typescript
// List products
const products = await client.products.list({ page: 1, per_page: 20 });

// Search products
const results = await client.products.search('laptop');

// Get a single product
const product = await client.products.get(123);

// Create a product
const newProduct = await client.products.create({
  name: 'New Product',
  sku: 'SKU-001',
  unit_price: 1500,
  cost_price: 1000,
});

// Update a product
await client.products.update(123, { unit_price: 1600 });
```

### Sales

```typescript
// List sales
const sales = await client.sales.list({
  start_date: '2024-01-01',
  end_date: '2024-12-31',
});

// Create a sale
const sale = await client.sales.create({
  customer_id: 1,
  payment_method: 'cash',
  items: [
    { product_id: 1, quantity: 2, unit_price: 500 },
    { product_id: 2, quantity: 1, unit_price: 1000 },
  ],
});

// Get sales analytics
const analytics = await client.sales.analytics({
  start_date: '2024-01-01',
  end_date: '2024-12-31',
});
```

### Inventory

```typescript
// List inventory
const inventory = await client.inventory.list({ warehouse_id: 1 });

// Get low stock products
const lowStock = await client.inventory.lowStock();

// Create stock transfer
const transfer = await client.inventory.createTransfer({
  from_warehouse_id: 1,
  to_warehouse_id: 2,
  items: [
    { product_id: 1, quantity: 10 },
  ],
});

// Create stock adjustment
await client.inventory.createAdjustment({
  product_id: 1,
  warehouse_id: 1,
  quantity: 5,
  adjustment_type: 'increase',
  reason: 'Stock count correction',
});
```

### Customers

```typescript
// List customers
const customers = await client.customers.list({ search: 'john' });

// Create customer
const customer = await client.customers.create({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+250788123456',
});

// Get customer balance
const balance = await client.customers.balance(customer.data!.id);
```

### Purchasing

```typescript
// List purchase orders
const orders = await client.purchasing.orders({ status: 'pending' });

// Create purchase order
const po = await client.purchasing.createOrder({
  supplier_id: 1,
  items: [
    { product_id: 1, quantity: 100, unit_price: 800 },
  ],
});

// Approve purchase order
await client.purchasing.approveOrder(po.data!.id);
```

### Accounting

```typescript
// List accounts
const accounts = await client.accounting.accounts({ type: 'asset' });

// Create journal entry
const journal = await client.accounting.createJournal({
  entry_date: '2024-01-15',
  description: 'Monthly rent payment',
  lines: [
    { account_id: 1, debit: 50000, credit: 0 },
    { account_id: 2, debit: 0, credit: 50000 },
  ],
});

// Post journal entry
await client.accounting.postJournal(journal.data!.id);

// Get trial balance
const trialBalance = await client.accounting.trialBalance('2024-12-31');
```

### HR

```typescript
// List employees
const employees = await client.hr.employees({ department_id: 1 });

// Clock in
await client.hr.clockIn(employeeId);

// Clock out
await client.hr.clockOut(employeeId);

// Approve leave request
await client.hr.approveLeave(leaveRequestId);
```

### CRM

```typescript
// List leads
const leads = await client.crm.leads({ status: 'new' });

// Create lead
const lead = await client.crm.createLead({
  name: 'Potential Customer',
  email: 'lead@example.com',
  source: 'website',
});

// Convert lead to customer
await client.crm.convertLead(lead.data!.id);

// Get pipeline
const pipeline = await client.crm.pipeline();
```

### Webhooks

```typescript
// List webhooks
const webhooks = await client.webhooks.list();

// Create webhook
const webhook = await client.webhooks.create({
  url: 'https://your-app.com/webhooks/bibike',
  events: ['sale.completed', 'inventory.low_stock'],
});

// The secret is only returned on creation
console.log('Webhook secret:', webhook.data!.secret);

// Test webhook
await client.webhooks.test(webhook.data!.id);
```

### POS & Reports

```typescript
// Open POS session
const session = await client.pos.openSession({
  warehouse_id: 1,
  opening_balance: 50000,
});

// Close POS session
await client.pos.closeSession(session.data!.id, {
  closing_balance: 150000,
});

// Get reports
const salesReport = await client.reports.sales({
  start_date: '2024-01-01',
  end_date: '2024-12-31',
  group_by: 'month',
});

const inventoryReport = await client.reports.inventory();
const profitLoss = await client.reports.profitLoss({
  start_date: '2024-01-01',
  end_date: '2024-12-31',
});

const dashboard = await client.reports.dashboard();
```

## Error Handling

```typescript
import { BibikeClient, BibikeApiError } from '@bibike/erp-sdk';

try {
  const product = await client.products.get(999);
} catch (error) {
  if (error instanceof BibikeApiError) {
    console.error('API Error:', error.message);
    console.error('Status Code:', error.statusCode);
    console.error('Error Code:', error.code);
  }
}
```

## Configuration Options

```typescript
const client = new BibikeClient({
  baseUrl: 'https://bibike.fivorana.com/api.php',
  token: 'your-api-token', // Optional: set token directly
  timeout: 30000, // Request timeout in milliseconds (default: 30000)
  headers: {
    'X-Custom-Header': 'value', // Custom headers
  },
});
```

## TypeScript Support

All types are exported for use in your TypeScript projects:

```typescript
import type {
  Product,
  Sale,
  Customer,
  PurchaseOrder,
  Employee,
  Lead,
  Opportunity,
  Webhook,
} from '@bibike/erp-sdk';

const products: Product[] = [];
```

## API Coverage

| Module | Methods |
|--------|---------|
| **Authentication** | login, logout, me, setToken |
| **Products** | list, get, create, update, delete, search |
| **Inventory** | list, transfers, createTransfer, approveTransfer, adjustments, createAdjustment, lowStock, outOfStock, valuation, movementHistory |
| **Sales** | list, get, create, quotations, createQuotation, orders, createOrder, analytics |
| **Customers** | list, get, create, update, delete, balance |
| **Suppliers** | list, get, create, update, delete |
| **Purchasing** | orders, getOrder, createOrder, approveOrder, requisitions, createRequisition, analytics |
| **Accounting** | accounts, getAccount, createAccount, journals, getJournal, createJournal, postJournal, trialBalance, taxRates |
| **HR** | employees, getEmployee, createEmployee, departments, positions, attendance, clockIn, clockOut, leaveRequests, approveLeave |
| **CRM** | leads, getLead, createLead, convertLead, opportunities, getOpportunity, createOpportunity, activities, createActivity, pipeline |
| **Webhooks** | list, get, create, update, delete, logs, test |
| **POS** | sessions, getSession, openSession, closeSession |
| **Reports** | sales, inventory, profitLoss, dashboard |
| **Locations** | warehouses, shops, all |

## License

MIT
