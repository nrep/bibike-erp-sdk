/**
 * Bibike ERP SDK Client
 */

import type {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  DateRangeParams,
  LoginCredentials,
  AuthResponse,
  User,
  Product,
  CreateProductInput,
  UpdateProductInput,
  InventoryItem,
  StockTransfer,
  CreateTransferInput,
  StockAdjustment,
  CreateAdjustmentInput,
  Sale,
  CreateSaleInput,
  Quotation,
  SalesOrder,
  Customer,
  CreateCustomerInput,
  Supplier,
  CreateSupplierInput,
  PurchaseOrder,
  CreatePurchaseOrderInput,
  PurchaseRequisition,
  Account,
  JournalEntry,
  CreateJournalEntryInput,
  TaxRate,
  Employee,
  Department,
  Position,
  Attendance,
  LeaveRequest,
  Lead,
  Opportunity,
  Activity,
  Webhook,
  CreateWebhookInput,
  POSSession,
  SalesReport,
  InventoryReport,
  ProfitLossReport,
  DashboardStats,
  Warehouse,
  Shop,
  Location,
} from './types';

export interface BibikeConfig {
  baseUrl: string;
  token?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export class BibikeClient {
  private baseUrl: string;
  private token: string | null = null;
  private timeout: number;
  private customHeaders: Record<string, string>;

  constructor(config: BibikeConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '');
    this.token = config.token || null;
    this.timeout = config.timeout || 30000;
    this.customHeaders = config.headers || {};
  }

  // ============ Auth ============

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('auth', 'login', 'POST', credentials);
    if (response.data?.token) {
      this.token = response.data.token;
    }
    return response.data!;
  }

  async logout(): Promise<void> {
    await this.request('auth', 'logout', 'POST');
    this.token = null;
  }

  async me(): Promise<User> {
    const response = await this.request<User>('auth', 'me');
    return response.data!;
  }

  setToken(token: string): void {
    this.token = token;
  }

  // ============ Products ============

  readonly products = {
    list: async (params?: PaginationParams & { search?: string; category?: string }) => {
      return this.request<Product[]>('products', 'list', 'GET', undefined, params);
    },

    get: async (id: number) => {
      return this.request<Product>('products', 'view', 'GET', undefined, { id });
    },

    create: async (data: CreateProductInput) => {
      return this.request<Product>('products', 'create', 'POST', data);
    },

    update: async (id: number, data: UpdateProductInput) => {
      return this.request<Product>('products', 'update', 'POST', data, { id });
    },

    delete: async (id: number) => {
      return this.request('products', 'delete', 'POST', undefined, { id });
    },

    search: async (query: string) => {
      return this.request<Product[]>('products', 'search', 'GET', undefined, { q: query });
    },
  };

  // ============ Inventory ============

  readonly inventory = {
    list: async (params?: { warehouse_id?: number; shop_id?: number; low_stock?: boolean }) => {
      return this.request<InventoryItem[]>('inventory', 'list', 'GET', undefined, params);
    },

    transfers: async () => {
      return this.request<StockTransfer[]>('inventory_extended', 'transfers');
    },

    createTransfer: async (data: CreateTransferInput) => {
      return this.request<StockTransfer>('inventory_extended', 'create_transfer', 'POST', data);
    },

    approveTransfer: async (id: number) => {
      return this.request('inventory_extended', 'approve_transfer', 'POST', undefined, { id });
    },

    adjustments: async () => {
      return this.request<StockAdjustment[]>('inventory_extended', 'adjustments');
    },

    createAdjustment: async (data: CreateAdjustmentInput) => {
      return this.request<StockAdjustment>('inventory_extended', 'create_adjustment', 'POST', data);
    },

    lowStock: async () => {
      return this.request<Product[]>('inventory_extended', 'low_stock');
    },

    outOfStock: async () => {
      return this.request<Product[]>('inventory_extended', 'out_of_stock');
    },

    valuation: async () => {
      return this.request('inventory_extended', 'valuation');
    },

    movementHistory: async (params?: DateRangeParams & { product_id?: number }) => {
      return this.request('inventory_extended', 'movement_history', 'GET', undefined, params);
    },
  };

  // ============ Sales ============

  readonly sales = {
    list: async (params?: PaginationParams & DateRangeParams & { customer_id?: number }) => {
      return this.request<Sale[]>('sales', 'list', 'GET', undefined, params);
    },

    get: async (id: number) => {
      return this.request<Sale>('sales', 'view', 'GET', undefined, { id });
    },

    create: async (data: CreateSaleInput) => {
      return this.request<Sale>('sales', 'create', 'POST', data);
    },

    quotations: async (params?: PaginationParams & { status?: string }) => {
      return this.request<Quotation[]>('sales_extended', 'quotations', 'GET', undefined, params);
    },

    createQuotation: async (data: CreateSaleInput & { valid_until?: string }) => {
      return this.request<Quotation>('sales_extended', 'create_quotation', 'POST', data);
    },

    orders: async (params?: PaginationParams & { status?: string }) => {
      return this.request<SalesOrder[]>('sales_extended', 'orders', 'GET', undefined, params);
    },

    createOrder: async (data: CreateSaleInput) => {
      return this.request<SalesOrder>('sales_extended', 'create_order', 'POST', data);
    },

    analytics: async (params?: DateRangeParams) => {
      return this.request('sales_extended', 'analytics', 'GET', undefined, params);
    },
  };

  // ============ Customers ============

  readonly customers = {
    list: async (params?: PaginationParams & { search?: string }) => {
      return this.request<Customer[]>('customers', 'list', 'GET', undefined, params);
    },

    get: async (id: number) => {
      return this.request<Customer>('customers', 'view', 'GET', undefined, { id });
    },

    create: async (data: CreateCustomerInput) => {
      return this.request<Customer>('customers', 'create', 'POST', data);
    },

    update: async (id: number, data: Partial<CreateCustomerInput>) => {
      return this.request<Customer>('customers', 'update', 'POST', data, { id });
    },

    delete: async (id: number) => {
      return this.request('customers', 'delete', 'POST', undefined, { id });
    },

    balance: async (id: number) => {
      return this.request<{ balance: number }>('customers', 'balance', 'GET', undefined, { id });
    },
  };

  // ============ Suppliers ============

  readonly suppliers = {
    list: async (params?: PaginationParams & { search?: string }) => {
      return this.request<Supplier[]>('suppliers', 'list', 'GET', undefined, params);
    },

    get: async (id: number) => {
      return this.request<Supplier>('suppliers', 'view', 'GET', undefined, { id });
    },

    create: async (data: CreateSupplierInput) => {
      return this.request<Supplier>('suppliers', 'create', 'POST', data);
    },

    update: async (id: number, data: Partial<CreateSupplierInput>) => {
      return this.request<Supplier>('suppliers', 'update', 'POST', data, { id });
    },

    delete: async (id: number) => {
      return this.request('suppliers', 'delete', 'POST', undefined, { id });
    },
  };

  // ============ Purchasing ============

  readonly purchasing = {
    orders: async (params?: PaginationParams & { status?: string; supplier_id?: number }) => {
      return this.request<PurchaseOrder[]>('purchase_orders', 'list', 'GET', undefined, params);
    },

    getOrder: async (id: number) => {
      return this.request<PurchaseOrder>('purchase_orders', 'view', 'GET', undefined, { id });
    },

    createOrder: async (data: CreatePurchaseOrderInput) => {
      return this.request<PurchaseOrder>('purchase_orders', 'create', 'POST', data);
    },

    approveOrder: async (id: number) => {
      return this.request('purchase_orders', 'approve', 'POST', undefined, { id });
    },

    requisitions: async (params?: PaginationParams & { status?: string }) => {
      return this.request<PurchaseRequisition[]>('purchasing_extended', 'requisitions', 'GET', undefined, params);
    },

    createRequisition: async (data: { items: Array<{ product_id: number; quantity: number }> }) => {
      return this.request<PurchaseRequisition>('purchasing_extended', 'create_requisition', 'POST', data);
    },

    analytics: async (params?: DateRangeParams) => {
      return this.request('purchasing_extended', 'analytics', 'GET', undefined, params);
    },
  };

  // ============ Accounting ============

  readonly accounting = {
    accounts: async (params?: { type?: string; is_active?: boolean }) => {
      return this.request<Account[]>('accounting', 'accounts', 'GET', undefined, params);
    },

    getAccount: async (id: number) => {
      return this.request<Account>('accounting', 'account', 'GET', undefined, { id });
    },

    createAccount: async (data: { code: string; name: string; type: string; parent_id?: number }) => {
      return this.request<Account>('accounting', 'create_account', 'POST', data);
    },

    journals: async (params?: PaginationParams & { status?: string }) => {
      return this.request<JournalEntry[]>('accounting', 'journals', 'GET', undefined, params);
    },

    getJournal: async (id: number) => {
      return this.request<JournalEntry>('accounting', 'journal', 'GET', undefined, { id });
    },

    createJournal: async (data: CreateJournalEntryInput) => {
      return this.request<JournalEntry>('accounting', 'create_journal', 'POST', data);
    },

    postJournal: async (id: number) => {
      return this.request('accounting', 'post_journal', 'POST', undefined, { id });
    },

    trialBalance: async (asOfDate?: string) => {
      return this.request('accounting', 'trial_balance', 'GET', undefined, { as_of_date: asOfDate });
    },

    taxRates: async () => {
      return this.request<TaxRate[]>('accounting', 'tax_rates');
    },
  };

  // ============ HR ============

  readonly hr = {
    employees: async (params?: PaginationParams & { department_id?: number; status?: string }) => {
      return this.request<Employee[]>('hr', 'employees', 'GET', undefined, params);
    },

    getEmployee: async (id: number) => {
      return this.request<Employee>('hr', 'employee', 'GET', undefined, { id });
    },

    createEmployee: async (data: Partial<Employee>) => {
      return this.request<Employee>('hr', 'create_employee', 'POST', data);
    },

    departments: async () => {
      return this.request<Department[]>('hr', 'departments');
    },

    positions: async () => {
      return this.request<Position[]>('hr', 'positions');
    },

    attendance: async (params?: DateRangeParams & { employee_id?: number }) => {
      return this.request<Attendance[]>('hr', 'attendance', 'GET', undefined, params);
    },

    clockIn: async (employeeId: number) => {
      return this.request('hr', 'clock_in', 'POST', { employee_id: employeeId });
    },

    clockOut: async (employeeId: number) => {
      return this.request('hr', 'clock_out', 'POST', { employee_id: employeeId });
    },

    leaveRequests: async (params?: { employee_id?: number; status?: string }) => {
      return this.request<LeaveRequest[]>('hr', 'leave_requests', 'GET', undefined, params);
    },

    approveLeave: async (id: number) => {
      return this.request('hr', 'approve_leave', 'POST', undefined, { id });
    },
  };

  // ============ CRM ============

  readonly crm = {
    leads: async (params?: PaginationParams & { status?: string; assigned_to?: number }) => {
      return this.request<Lead[]>('crm', 'leads', 'GET', undefined, params);
    },

    getLead: async (id: number) => {
      return this.request<Lead>('crm', 'lead', 'GET', undefined, { id });
    },

    createLead: async (data: Partial<Lead>) => {
      return this.request<Lead>('crm', 'create_lead', 'POST', data);
    },

    convertLead: async (id: number) => {
      return this.request('crm', 'convert_lead', 'POST', undefined, { id });
    },

    opportunities: async (params?: PaginationParams & { stage_id?: number }) => {
      return this.request<Opportunity[]>('crm', 'opportunities', 'GET', undefined, params);
    },

    getOpportunity: async (id: number) => {
      return this.request<Opportunity>('crm', 'opportunity', 'GET', undefined, { id });
    },

    createOpportunity: async (data: Partial<Opportunity>) => {
      return this.request<Opportunity>('crm', 'create_opportunity', 'POST', data);
    },

    activities: async (params?: { type?: string; status?: string; opportunity_id?: number }) => {
      return this.request<Activity[]>('crm', 'activities', 'GET', undefined, params);
    },

    createActivity: async (data: Partial<Activity>) => {
      return this.request<Activity>('crm', 'create_activity', 'POST', data);
    },

    pipeline: async () => {
      return this.request('crm', 'pipeline');
    },
  };

  // ============ Webhooks ============

  readonly webhooks = {
    list: async () => {
      return this.request<Webhook[]>('webhooks', 'list');
    },

    get: async (id: number) => {
      return this.request<Webhook>('webhooks', 'view', 'GET', undefined, { id });
    },

    create: async (data: CreateWebhookInput) => {
      return this.request<{ id: number; secret: string }>('webhooks', 'create', 'POST', data);
    },

    update: async (id: number, data: { url?: string; events?: string[]; is_active?: boolean }) => {
      return this.request('webhooks', 'update', 'POST', data, { id });
    },

    delete: async (id: number) => {
      return this.request('webhooks', 'delete', 'POST', undefined, { id });
    },

    logs: async (id: number) => {
      return this.request('webhooks', 'logs', 'GET', undefined, { id });
    },

    test: async (id: number) => {
      return this.request('webhooks', 'test', 'POST', undefined, { id });
    },
  };

  // ============ POS & Reports ============

  readonly pos = {
    sessions: async () => {
      return this.request<POSSession[]>('pos_reports', 'sessions');
    },

    getSession: async (id: number) => {
      return this.request<POSSession>('pos_reports', 'session', 'GET', undefined, { id });
    },

    openSession: async (data: { warehouse_id?: number; shop_id?: number; opening_balance?: number }) => {
      return this.request<{ id: number }>('pos_reports', 'open_session', 'POST', data);
    },

    closeSession: async (id: number, data: { closing_balance: number; notes?: string }) => {
      return this.request('pos_reports', 'close_session', 'POST', data, { id });
    },
  };

  readonly reports = {
    sales: async (params?: DateRangeParams & { group_by?: 'day' | 'week' | 'month' }) => {
      return this.request<SalesReport>('pos_reports', 'sales_report', 'GET', undefined, params);
    },

    inventory: async () => {
      return this.request<InventoryReport>('pos_reports', 'inventory_report');
    },

    profitLoss: async (params?: DateRangeParams) => {
      return this.request<ProfitLossReport>('pos_reports', 'profit_loss', 'GET', undefined, params);
    },

    dashboard: async () => {
      return this.request<DashboardStats>('pos_reports', 'dashboard_stats');
    },
  };

  // ============ Locations ============

  readonly locations = {
    warehouses: async () => {
      return this.request<Warehouse[]>('warehouses', 'list');
    },

    shops: async () => {
      return this.request<Shop[]>('shops', 'list');
    },

    all: async (params?: { type_id?: number; capability?: string }) => {
      return this.request<Location[]>('locations', 'list', 'GET', undefined, params);
    },
  };

  // ============ Core Request Method ============

  private async request<T>(
    resource: string,
    action: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: unknown,
    params?: Record<string, string | number | boolean | undefined>
  ): Promise<ApiResponse<T>> {
    const url = new URL(this.baseUrl);
    url.searchParams.set('resource', resource);
    url.searchParams.set('action', action);

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value));
        }
      }
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...this.customHeaders,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url.toString(), {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        throw new BibikeApiError(
          data.message || data.error || 'Request failed',
          response.status,
          data.code
        );
      }

      return data as ApiResponse<T>;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof BibikeApiError) {
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new BibikeApiError('Request timeout', 408, 'TIMEOUT');
      }

      throw new BibikeApiError(
        error instanceof Error ? error.message : 'Unknown error',
        0,
        'NETWORK_ERROR'
      );
    }
  }
}

export class BibikeApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly code?: string
  ) {
    super(message);
    this.name = 'BibikeApiError';
  }
}
