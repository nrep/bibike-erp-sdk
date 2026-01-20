/**
 * Bibike ERP SDK Types
 */

// ============ Common Types ============

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  code?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

export interface PaginationParams {
  page?: number;
  per_page?: number;
  [key: string]: string | number | boolean | undefined;
}

export interface DateRangeParams {
  start_date?: string;
  end_date?: string;
  [key: string]: string | number | boolean | undefined;
}

// ============ Auth Types ============

export interface LoginCredentials {
  /** Email or username */
  login: string;
  password: string;
  /** 2FA code if required */
  two_factor_code?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  expires_at: string;
}

export interface TwoFactorRequiredResponse {
  requires_2fa: true;
  /** Temporary token to use when submitting 2FA code */
  temp_token: string;
  /** Available 2FA methods */
  methods: ('totp' | 'sms' | 'email')[];
}

export interface LoginResponse {
  success: boolean;
  data?: AuthResponse;
  requires_2fa?: boolean;
  temp_token?: string;
  methods?: ('totp' | 'sms' | 'email')[];
  message?: string;
}

export interface TwoFactorVerifyInput {
  temp_token: string;
  code: string;
  method?: 'totp' | 'sms' | 'email';
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  organization_id: number;
  organization_name?: string;
  permissions?: string[];
}

// ============ Product Types ============

export interface ProductImage {
  id: number;
  url: string;
  is_primary: boolean;
  display_order: number;
}

export interface Product {
  id: number;
  organization_id: number;
  name: string;
  sku: string;
  barcode?: string;
  description?: string;
  category?: string;
  category_id?: number;
  unit_id?: number;
  unit_name?: string;
  unit_price: number;
  cost_price?: number;
  reorder_level?: number;
  total_stock?: number;
  is_active: boolean;
  images?: ProductImage[];
  created_at: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface CreateProductInput {
  name: string;
  sku?: string;
  barcode?: string;
  description?: string;
  category?: string;
  category_id?: number;
  unit_id?: number;
  unit_price: number;
  cost_price?: number;
  reorder_level?: number;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  is_active?: boolean;
}

// ============ Inventory Types ============

export interface InventoryItem {
  id: number;
  product_id: number;
  product_name: string;
  sku: string;
  warehouse_id?: number;
  warehouse_name?: string;
  shop_id?: number;
  shop_name?: string;
  quantity: number;
  reorder_level?: number;
}

export interface StockTransfer {
  id: number;
  transfer_number: string;
  from_warehouse_id?: number;
  from_shop_id?: number;
  to_warehouse_id?: number;
  to_shop_id?: number;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
  items?: StockTransferItem[];
}

export interface StockTransferItem {
  product_id: number;
  quantity: number;
}

export interface CreateTransferInput {
  from_warehouse_id?: number;
  from_shop_id?: number;
  to_warehouse_id?: number;
  to_shop_id?: number;
  notes?: string;
  items: StockTransferItem[];
}

export interface StockAdjustment {
  id: number;
  product_id: number;
  warehouse_id?: number;
  shop_id?: number;
  quantity: number;
  adjustment_type: 'increase' | 'decrease';
  reason: string;
  notes?: string;
  created_at: string;
}

export interface CreateAdjustmentInput {
  product_id: number;
  warehouse_id?: number;
  shop_id?: number;
  quantity: number;
  adjustment_type: 'increase' | 'decrease';
  reason: string;
  notes?: string;
}

// ============ Sales Types ============

export interface Sale {
  id: number;
  sale_number: string;
  customer_id?: number;
  customer_name?: string;
  total_amount: number;
  discount_amount?: number;
  tax_amount?: number;
  payment_method?: string;
  payment_status: 'pending' | 'partial' | 'paid';
  status: 'draft' | 'completed' | 'voided';
  sale_date: string;
  notes?: string;
  created_at: string;
  items?: SaleItem[];
}

export interface SaleItem {
  product_id: number;
  product_name?: string;
  quantity: number;
  unit_price: number;
  discount?: number;
  total: number;
}

export interface CreateSaleInput {
  location_id?: number;
  customer_id?: number;
  warehouse_id?: number;
  shop_id?: number;
  payment_method?: string;
  discount_amount?: number;
  notes?: string;
  sale_date?: string;
  items: Array<{
    product_id: number;
    quantity: number;
    unit_price?: number;
    discount?: number;
  }>;
}

export interface Quotation {
  id: number;
  quotation_number: string;
  customer_id?: number;
  customer_name?: string;
  total_amount: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  valid_until?: string;
  created_at: string;
  items?: SaleItem[];
}

export interface SalesOrder {
  id: number;
  order_number: string;
  customer_id?: number;
  customer_name?: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  order_date: string;
  items?: SaleItem[];
}

// ============ Customer Types ============

export interface Customer {
  id: number;
  organization_id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  tin?: string;
  credit_limit?: number;
  balance?: number;
  is_active: boolean;
  created_at: string;
}

export interface CreateCustomerInput {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  tin?: string;
  credit_limit?: number;
}

// ============ Supplier Types ============

export interface Supplier {
  id: number;
  organization_id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  tin?: string;
  balance?: number;
  is_active: boolean;
  created_at: string;
}

export interface CreateSupplierInput {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  tin?: string;
}

// ============ Purchase Types ============

export interface PurchaseOrder {
  id: number;
  order_number: string;
  supplier_id: number;
  supplier_name?: string;
  total_amount: number;
  status: 'draft' | 'pending' | 'approved' | 'submitted' | 'received' | 'cancelled';
  order_date: string;
  expected_date?: string;
  items?: PurchaseOrderItem[];
}

export interface PurchaseOrderItem {
  product_id: number;
  product_name?: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface CreatePurchaseOrderInput {
  supplier_id: number;
  warehouse_id?: number;
  expected_date?: string;
  notes?: string;
  items: Array<{
    product_id: number;
    quantity: number;
    unit_price: number;
  }>;
}

export interface PurchaseRequisition {
  id: number;
  requisition_number: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'ordered';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  requested_by: number;
  approved_by?: number;
  notes?: string;
  created_at: string;
  items?: Array<{
    product_id: number;
    quantity: number;
    notes?: string;
  }>;
}

// ============ Accounting Types ============

export interface Account {
  id: number;
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  parent_id?: number;
  opening_balance: number;
  current_balance: number;
  is_active: boolean;
}

export interface JournalEntry {
  id: number;
  entry_number: string;
  entry_date: string;
  description: string;
  status: 'draft' | 'posted' | 'voided';
  total_debit: number;
  total_credit: number;
  lines?: JournalLine[];
}

export interface JournalLine {
  account_id: number;
  account_name?: string;
  debit: number;
  credit: number;
  description?: string;
}

export interface CreateJournalEntryInput {
  entry_date: string;
  description: string;
  lines: Array<{
    account_id: number;
    debit: number;
    credit: number;
    description?: string;
  }>;
}

export interface TaxRate {
  id: number;
  name: string;
  rate: number;
  type: 'vat' | 'wht' | 'other';
  is_active: boolean;
}

// ============ HR Types ============

export interface Employee {
  id: number;
  employee_number: string;
  full_name: string;
  email?: string;
  phone?: string;
  department_id?: number;
  department_name?: string;
  position_id?: number;
  position_name?: string;
  hire_date: string;
  employment_status: 'active' | 'on_leave' | 'suspended' | 'terminated';
  employment_type: 'full_time' | 'part_time' | 'contract' | 'intern';
  basic_salary?: number;
}

export interface Department {
  id: number;
  name: string;
  description?: string;
  manager_id?: number;
}

export interface Position {
  id: number;
  name: string;
  department_id?: number;
  min_salary?: number;
  max_salary?: number;
}

export interface Attendance {
  id: number;
  employee_id: number;
  employee_name?: string;
  date: string;
  check_in?: string;
  check_out?: string;
  status: 'present' | 'absent' | 'late' | 'half_day' | 'on_leave';
}

export interface LeaveRequest {
  id: number;
  employee_id: number;
  employee_name?: string;
  leave_type_id: number;
  leave_type_name?: string;
  start_date: string;
  end_date: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  reason?: string;
}

// ============ CRM Types ============

export interface Lead {
  id: number;
  lead_number: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  source?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  assigned_to?: number;
  created_at: string;
}

export interface Opportunity {
  id: number;
  opportunity_number: string;
  name: string;
  customer_id?: number;
  customer_name?: string;
  value: number;
  stage_id?: number;
  stage_name?: string;
  probability?: number;
  expected_close_date?: string;
  is_won?: boolean;
  owner_id?: number;
}

export interface Activity {
  id: number;
  activity_number: string;
  type: 'call' | 'email' | 'meeting' | 'task' | 'note';
  subject: string;
  description?: string;
  due_date?: string;
  status: 'pending' | 'completed' | 'cancelled';
  assigned_to?: number;
  opportunity_id?: number;
  customer_id?: number;
}

// ============ Webhook Types ============

export interface Webhook {
  id: number;
  url: string;
  events: string[];
  is_active: boolean;
  created_at: string;
  recent_deliveries?: WebhookDelivery[];
}

export interface WebhookDelivery {
  id: number;
  event: string;
  status_code: number;
  success: boolean;
  created_at: string;
}

export interface CreateWebhookInput {
  url: string;
  events: WebhookEvent[];
}

export type WebhookEvent =
  | 'sale.created'
  | 'sale.completed'
  | 'sale.voided'
  | 'inventory.stock_in'
  | 'inventory.stock_out'
  | 'inventory.low_stock'
  | 'purchase.created'
  | 'purchase.received'
  | 'customer.created'
  | 'customer.updated'
  | 'product.created'
  | 'product.updated';

// ============ POS Types ============

export interface POSSession {
  id: number;
  user_id: number;
  cashier_name?: string;
  warehouse_id?: number;
  warehouse_name?: string;
  shop_id?: number;
  shop_name?: string;
  opening_balance: number;
  closing_balance?: number;
  expected_balance?: number;
  difference?: number;
  status: 'open' | 'closed';
  opened_at: string;
  closed_at?: string;
  sales?: Sale[];
}

// ============ Report Types ============

export interface SalesReport {
  periods: Array<{
    period: string;
    sales_count: number;
    total_sales: number;
    total_discounts: number;
    avg_sale: number;
  }>;
  totals: {
    total_count: number;
    total_amount: number;
    total_discounts: number;
  };
  filters: {
    start_date: string;
    end_date: string;
    group_by: string;
  };
}

export interface InventoryReport {
  summary: {
    total_products: number;
    total_quantity: number;
    total_cost_value: number;
    total_retail_value: number;
  };
  low_stock_count: number;
  out_of_stock_count: number;
}

export interface ProfitLossReport {
  revenue: number;
  cost_of_goods_sold: number;
  gross_profit: number;
  gross_margin: number;
  purchases: number;
  net_profit: number;
  period: {
    start_date: string;
    end_date: string;
  };
}

export interface DashboardStats {
  today_sales: {
    count: number;
    total: number;
  };
  month_sales: {
    count: number;
    total: number;
  };
  low_stock_count: number;
  pending_orders: number;
}

// ============ Location Types ============

export interface Warehouse {
  id: number;
  name: string;
  address?: string;
  is_active: boolean;
}

export interface Shop {
  id: number;
  name: string;
  address?: string;
  is_active: boolean;
}

export interface Location {
  id: number;
  name: string;
  type_id: number;
  type_name?: string;
  address?: string;
  is_active: boolean;
}

export interface LocationInventoryItem {
  product_id: number;
  product_name: string;
  sku?: string;
  barcode?: string;
  category?: string;
  unit_price: number;
  quantity: number;
  reserved_quantity?: number;
  available_quantity?: number;
}
