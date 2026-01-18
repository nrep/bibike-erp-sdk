/**
 * Bibike ERP SDK Integration Tests
 * 
 * These tests run against a live Bibike API server.
 * Set environment variables before running:
 * 
 * BIBIKE_API_URL=https://bibike.fivorana.com/api.php
 * BIBIKE_TEST_EMAIL=test@example.com
 * BIBIKE_TEST_PASSWORD=password123
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { BibikeClient, BibikeApiError } from './client';

const API_URL = process.env.BIBIKE_API_URL || 'https://bibike.fivorana.com/api.php';
const TEST_EMAIL = process.env.BIBIKE_TEST_EMAIL || '';
const TEST_PASSWORD = process.env.BIBIKE_TEST_PASSWORD || '';

describe('Integration Tests', () => {
  let client: BibikeClient;
  let isAuthenticated = false;

  beforeAll(async () => {
    client = new BibikeClient({ baseUrl: API_URL });

    if (TEST_EMAIL && TEST_PASSWORD) {
      try {
        await client.login({ email: TEST_EMAIL, password: TEST_PASSWORD });
        isAuthenticated = true;
        console.log('✓ Authenticated successfully');
      } catch (error) {
        console.warn('⚠ Authentication failed, some tests will be skipped');
      }
    } else {
      console.warn('⚠ No credentials provided, auth tests will be skipped');
    }
  });

  describe('Authentication', () => {
    it('should connect to the API server', async () => {
      // Just verify we can reach the server
      const testClient = new BibikeClient({ baseUrl: API_URL });
      try {
        await testClient.me();
      } catch (error) {
        // Expected to fail without auth, but should get a proper error
        expect(error).toBeInstanceOf(BibikeApiError);
      }
    });

    it.skipIf(!TEST_EMAIL)('should login with valid credentials', async () => {
      const testClient = new BibikeClient({ baseUrl: API_URL });
      const auth = await testClient.login({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      });

      expect(auth.token).toBeDefined();
      expect(auth.user).toBeDefined();
      expect(auth.user.email).toBe(TEST_EMAIL);
    });

    it.skipIf(!isAuthenticated)('should get current user', async () => {
      const user = await client.me();
      expect(user.id).toBeDefined();
      expect(user.email).toBe(TEST_EMAIL);
    });
  });

  describe('Products', () => {
    it.skipIf(!isAuthenticated)('should list products', async () => {
      const response = await client.products.list();
      expect(response.success).toBe(true);
      expect(Array.isArray(response.data)).toBe(true);
    });

    it.skipIf(!isAuthenticated)('should search products', async () => {
      const response = await client.products.search('test');
      expect(response.success).toBe(true);
    });

    it.skipIf(!isAuthenticated)('should get product by ID', async () => {
      const listResponse = await client.products.list({ per_page: 1 });
      if (listResponse.data && listResponse.data.length > 0) {
        const product = await client.products.get(listResponse.data[0].id);
        expect(product.success).toBe(true);
        expect(product.data?.id).toBe(listResponse.data[0].id);
      }
    });
  });

  describe('Inventory', () => {
    it.skipIf(!isAuthenticated)('should list inventory', async () => {
      const response = await client.inventory.list();
      expect(response.success).toBe(true);
    });

    it.skipIf(!isAuthenticated)('should get low stock items', async () => {
      const response = await client.inventory.lowStock();
      expect(response.success).toBe(true);
    });
  });

  describe('Sales', () => {
    it.skipIf(!isAuthenticated)('should list sales', async () => {
      const response = await client.sales.list();
      expect(response.success).toBe(true);
      expect(Array.isArray(response.data)).toBe(true);
    });

    it.skipIf(!isAuthenticated)('should get sales analytics', async () => {
      const response = await client.sales.analytics({
        start_date: '2024-01-01',
        end_date: '2024-12-31',
      });
      expect(response.success).toBe(true);
    });
  });

  describe('Customers', () => {
    it.skipIf(!isAuthenticated)('should list customers', async () => {
      const response = await client.customers.list();
      expect(response.success).toBe(true);
      expect(Array.isArray(response.data)).toBe(true);
    });

    it.skipIf(!isAuthenticated)('should search customers', async () => {
      const response = await client.customers.list({ search: 'test' });
      expect(response.success).toBe(true);
    });
  });

  describe('Suppliers', () => {
    it.skipIf(!isAuthenticated)('should list suppliers', async () => {
      const response = await client.suppliers.list();
      expect(response.success).toBe(true);
      expect(Array.isArray(response.data)).toBe(true);
    });
  });

  describe('Purchasing', () => {
    it.skipIf(!isAuthenticated)('should list purchase orders', async () => {
      const response = await client.purchasing.orders();
      expect(response.success).toBe(true);
    });
  });

  describe('Accounting', () => {
    it.skipIf(!isAuthenticated)('should list accounts', async () => {
      const response = await client.accounting.accounts();
      expect(response.success).toBe(true);
    });

    it.skipIf(!isAuthenticated)('should get trial balance', async () => {
      const response = await client.accounting.trialBalance();
      expect(response.success).toBe(true);
    });
  });

  describe('HR', () => {
    it.skipIf(!isAuthenticated)('should list employees', async () => {
      const response = await client.hr.employees();
      expect(response.success).toBe(true);
    });

    it.skipIf(!isAuthenticated)('should list departments', async () => {
      const response = await client.hr.departments();
      expect(response.success).toBe(true);
    });
  });

  describe('CRM', () => {
    it.skipIf(!isAuthenticated)('should list leads', async () => {
      const response = await client.crm.leads();
      expect(response.success).toBe(true);
    });

    it.skipIf(!isAuthenticated)('should list opportunities', async () => {
      const response = await client.crm.opportunities();
      expect(response.success).toBe(true);
    });

    it.skipIf(!isAuthenticated)('should get pipeline', async () => {
      const response = await client.crm.pipeline();
      expect(response.success).toBe(true);
    });
  });

  describe('Webhooks', () => {
    it.skipIf(!isAuthenticated)('should list webhooks', async () => {
      const response = await client.webhooks.list();
      expect(response.success).toBe(true);
    });
  });

  describe('POS & Reports', () => {
    it.skipIf(!isAuthenticated)('should list POS sessions', async () => {
      const response = await client.pos.sessions();
      expect(response.success).toBe(true);
    });

    it.skipIf(!isAuthenticated)('should get dashboard stats', async () => {
      const response = await client.reports.dashboard();
      expect(response.success).toBe(true);
    });

    it.skipIf(!isAuthenticated)('should get sales report', async () => {
      const response = await client.reports.sales({
        start_date: '2024-01-01',
        end_date: '2024-12-31',
      });
      expect(response.success).toBe(true);
    });

    it.skipIf(!isAuthenticated)('should get inventory report', async () => {
      const response = await client.reports.inventory();
      expect(response.success).toBe(true);
    });
  });

  describe('Locations', () => {
    it.skipIf(!isAuthenticated)('should list warehouses', async () => {
      const response = await client.locations.warehouses();
      expect(response.success).toBe(true);
    });

    it.skipIf(!isAuthenticated)('should list shops', async () => {
      const response = await client.locations.shops();
      expect(response.success).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should throw BibikeApiError for invalid credentials', async () => {
      const testClient = new BibikeClient({ baseUrl: API_URL });
      
      await expect(
        testClient.login({ email: 'invalid@example.com', password: 'wrongpassword' })
      ).rejects.toThrow(BibikeApiError);
    });

    it('should throw BibikeApiError for unauthorized access', async () => {
      const testClient = new BibikeClient({ baseUrl: API_URL });
      
      await expect(testClient.products.list()).rejects.toThrow(BibikeApiError);
    });

    it.skipIf(!isAuthenticated)('should throw BibikeApiError for not found', async () => {
      await expect(client.products.get(999999)).rejects.toThrow(BibikeApiError);
    });
  });
});
