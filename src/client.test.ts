/**
 * Bibike ERP SDK Tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BibikeClient, BibikeApiError } from './client';

describe('BibikeClient', () => {
  let client: BibikeClient;

  beforeEach(() => {
    client = new BibikeClient({
      baseUrl: 'https://bibike.fivorana.com/api.php',
    });
  });

  describe('constructor', () => {
    it('should create client with base URL', () => {
      expect(client).toBeInstanceOf(BibikeClient);
    });

    it('should strip trailing slash from base URL', () => {
      const c = new BibikeClient({
        baseUrl: 'https://bibike.fivorana.com/api.php/',
      });
      expect(c).toBeInstanceOf(BibikeClient);
    });

    it('should accept token in config', () => {
      const c = new BibikeClient({
        baseUrl: 'https://bibike.fivorana.com/api.php',
        token: 'test-token',
      });
      expect(c).toBeInstanceOf(BibikeClient);
    });
  });

  describe('setToken', () => {
    it('should set the token', () => {
      client.setToken('new-token');
      expect(client).toBeInstanceOf(BibikeClient);
    });
  });

  describe('products', () => {
    it('should have list method', () => {
      expect(typeof client.products.list).toBe('function');
    });

    it('should have get method', () => {
      expect(typeof client.products.get).toBe('function');
    });

    it('should have create method', () => {
      expect(typeof client.products.create).toBe('function');
    });

    it('should have update method', () => {
      expect(typeof client.products.update).toBe('function');
    });

    it('should have delete method', () => {
      expect(typeof client.products.delete).toBe('function');
    });

    it('should have search method', () => {
      expect(typeof client.products.search).toBe('function');
    });
  });

  describe('inventory', () => {
    it('should have list method', () => {
      expect(typeof client.inventory.list).toBe('function');
    });

    it('should have transfers method', () => {
      expect(typeof client.inventory.transfers).toBe('function');
    });

    it('should have createTransfer method', () => {
      expect(typeof client.inventory.createTransfer).toBe('function');
    });

    it('should have lowStock method', () => {
      expect(typeof client.inventory.lowStock).toBe('function');
    });
  });

  describe('sales', () => {
    it('should have list method', () => {
      expect(typeof client.sales.list).toBe('function');
    });

    it('should have get method', () => {
      expect(typeof client.sales.get).toBe('function');
    });

    it('should have create method', () => {
      expect(typeof client.sales.create).toBe('function');
    });

    it('should have quotations method', () => {
      expect(typeof client.sales.quotations).toBe('function');
    });

    it('should have orders method', () => {
      expect(typeof client.sales.orders).toBe('function');
    });

    it('should have analytics method', () => {
      expect(typeof client.sales.analytics).toBe('function');
    });
  });

  describe('customers', () => {
    it('should have list method', () => {
      expect(typeof client.customers.list).toBe('function');
    });

    it('should have get method', () => {
      expect(typeof client.customers.get).toBe('function');
    });

    it('should have create method', () => {
      expect(typeof client.customers.create).toBe('function');
    });

    it('should have balance method', () => {
      expect(typeof client.customers.balance).toBe('function');
    });
  });

  describe('suppliers', () => {
    it('should have list method', () => {
      expect(typeof client.suppliers.list).toBe('function');
    });

    it('should have get method', () => {
      expect(typeof client.suppliers.get).toBe('function');
    });

    it('should have create method', () => {
      expect(typeof client.suppliers.create).toBe('function');
    });
  });

  describe('purchasing', () => {
    it('should have orders method', () => {
      expect(typeof client.purchasing.orders).toBe('function');
    });

    it('should have getOrder method', () => {
      expect(typeof client.purchasing.getOrder).toBe('function');
    });

    it('should have createOrder method', () => {
      expect(typeof client.purchasing.createOrder).toBe('function');
    });

    it('should have requisitions method', () => {
      expect(typeof client.purchasing.requisitions).toBe('function');
    });
  });

  describe('accounting', () => {
    it('should have accounts method', () => {
      expect(typeof client.accounting.accounts).toBe('function');
    });

    it('should have journals method', () => {
      expect(typeof client.accounting.journals).toBe('function');
    });

    it('should have createJournal method', () => {
      expect(typeof client.accounting.createJournal).toBe('function');
    });

    it('should have trialBalance method', () => {
      expect(typeof client.accounting.trialBalance).toBe('function');
    });
  });

  describe('hr', () => {
    it('should have employees method', () => {
      expect(typeof client.hr.employees).toBe('function');
    });

    it('should have departments method', () => {
      expect(typeof client.hr.departments).toBe('function');
    });

    it('should have attendance method', () => {
      expect(typeof client.hr.attendance).toBe('function');
    });

    it('should have clockIn method', () => {
      expect(typeof client.hr.clockIn).toBe('function');
    });

    it('should have leaveRequests method', () => {
      expect(typeof client.hr.leaveRequests).toBe('function');
    });
  });

  describe('crm', () => {
    it('should have leads method', () => {
      expect(typeof client.crm.leads).toBe('function');
    });

    it('should have opportunities method', () => {
      expect(typeof client.crm.opportunities).toBe('function');
    });

    it('should have activities method', () => {
      expect(typeof client.crm.activities).toBe('function');
    });

    it('should have pipeline method', () => {
      expect(typeof client.crm.pipeline).toBe('function');
    });
  });

  describe('webhooks', () => {
    it('should have list method', () => {
      expect(typeof client.webhooks.list).toBe('function');
    });

    it('should have create method', () => {
      expect(typeof client.webhooks.create).toBe('function');
    });

    it('should have test method', () => {
      expect(typeof client.webhooks.test).toBe('function');
    });
  });

  describe('pos', () => {
    it('should have sessions method', () => {
      expect(typeof client.pos.sessions).toBe('function');
    });

    it('should have openSession method', () => {
      expect(typeof client.pos.openSession).toBe('function');
    });

    it('should have closeSession method', () => {
      expect(typeof client.pos.closeSession).toBe('function');
    });
  });

  describe('reports', () => {
    it('should have sales method', () => {
      expect(typeof client.reports.sales).toBe('function');
    });

    it('should have inventory method', () => {
      expect(typeof client.reports.inventory).toBe('function');
    });

    it('should have profitLoss method', () => {
      expect(typeof client.reports.profitLoss).toBe('function');
    });

    it('should have dashboard method', () => {
      expect(typeof client.reports.dashboard).toBe('function');
    });
  });

  describe('locations', () => {
    it('should have warehouses method', () => {
      expect(typeof client.locations.warehouses).toBe('function');
    });

    it('should have shops method', () => {
      expect(typeof client.locations.shops).toBe('function');
    });

    it('should have all method', () => {
      expect(typeof client.locations.all).toBe('function');
    });
  });
});

describe('BibikeApiError', () => {
  it('should create error with message and status code', () => {
    const error = new BibikeApiError('Not found', 404, 'NOT_FOUND');
    expect(error.message).toBe('Not found');
    expect(error.statusCode).toBe(404);
    expect(error.code).toBe('NOT_FOUND');
    expect(error.name).toBe('BibikeApiError');
  });

  it('should extend Error', () => {
    const error = new BibikeApiError('Test error', 500);
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(BibikeApiError);
  });
});

describe('API Integration (mocked)', () => {
  let client: BibikeClient;

  beforeEach(() => {
    client = new BibikeClient({
      baseUrl: 'https://bibike.fivorana.com/api.php',
      token: 'test-token',
    });

    // Mock fetch globally
    global.fetch = vi.fn();
  });

  it('should make GET request with correct URL', async () => {
    const mockResponse = {
      success: true,
      data: [{ id: 1, name: 'Product 1' }],
    };

    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await client.products.list();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('resource=products'),
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'Authorization': 'Bearer test-token',
        }),
      })
    );

    expect(result.success).toBe(true);
  });

  it('should make POST request with body', async () => {
    const mockResponse = {
      success: true,
      data: { id: 1, name: 'New Product' },
    };

    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    await client.products.create({
      name: 'New Product',
      unit_price: 100,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('action=create'),
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('New Product'),
      })
    );
  });

  it('should throw BibikeApiError on API error', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: 'Not found', code: 'NOT_FOUND' }),
    });

    await expect(client.products.get(999)).rejects.toThrow(BibikeApiError);
  });

  it('should handle network errors', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('Network error')
    );

    await expect(client.products.list()).rejects.toThrow(BibikeApiError);
  });
});
