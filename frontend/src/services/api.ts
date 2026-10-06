import { BASE_URL } from "../constants/api";

export const API_URL = `${BASE_URL}/v1`;

function getHeaders(extra: HeadersInit = {}): HeadersInit {
  const token = localStorage.getItem("cad-admin-token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${res.status}`);
  }
  const json = await res.json();
  return json.data !== undefined ? json.data : json;
}

export const api = {
  // Auth
  async login(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse<{ user: any; accessToken: string; refreshToken: string }>(res);
  },

  async signup(data: { fullName: string; email: string; password: string }) {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<any>(res);
  },

  async logout() {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: getHeaders(),
      });
    } finally {
      localStorage.removeItem("cad-admin-token");
      localStorage.removeItem("cad-admin-user");
    }
  },

  // Products & Collections
  async getCollections() {
    const res = await fetch(`${API_URL}/products/collections`);
    return handleResponse<any[]>(res);
  },

  async getProducts(params?: { category?: string; collectionSlug?: string; status?: string; keyword?: string }) {
    const q = new URLSearchParams();
    if (params?.category) q.set("category", params.category);
    if (params?.collectionSlug) q.set("collectionSlug", params.collectionSlug);
    if (params?.status) q.set("status", params.status);
    if (params?.keyword) q.set("keyword", params.keyword);

    const res = await fetch(`${API_URL}/products?${q.toString()}`);
    return handleResponse<any[]>(res);
  },

  async createProduct(data: any) {
    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<any>(res);
  },

  async updateProduct(id: string, patch: any) {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(patch),
    });
    return handleResponse<any>(res);
  },

  async deleteProduct(id: string) {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return handleResponse<any>(res);
  },

  async createCollection(data: any) {
    const res = await fetch(`${API_URL}/products/collections`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<any>(res);
  },

  async updateCollection(id: string, patch: any) {
    const res = await fetch(`${API_URL}/products/collections/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(patch),
    });
    return handleResponse<any>(res);
  },

  // Orders
  async getOrders(params?: { status?: string; channel?: string; keyword?: string }) {
    const q = new URLSearchParams();
    if (params?.status && params.status !== "all") q.set("status", params.status);
    if (params?.channel && params.channel !== "all") q.set("channel", params.channel);
    if (params?.keyword) q.set("keyword", params.keyword);

    const res = await fetch(`${API_URL}/orders?${q.toString()}`);
    return handleResponse<any[]>(res);
  },

  async updateOrderStatus(id: string, status: string) {
    const res = await fetch(`${API_URL}/orders/${id}/status`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    });
    return handleResponse<any>(res);
  },

  async createOrder(data: any) {
    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<any>(res);
  },

  async deleteOrder(id: string) {
    const res = await fetch(`${API_URL}/orders/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return handleResponse<any>(res);
  },

  // Customers
  async getCustomers(params?: { status?: string; keyword?: string }) {
    const q = new URLSearchParams();
    if (params?.status && params.status !== "all") q.set("status", params.status);
    if (params?.keyword) q.set("keyword", params.keyword);

    const res = await fetch(`${API_URL}/customers?${q.toString()}`);
    return handleResponse<any[]>(res);
  },

  async toggleCustomerStatus(id: string) {
    const res = await fetch(`${API_URL}/customers/${id}/status`, {
      method: "PATCH",
      headers: getHeaders(),
    });
    return handleResponse<any>(res);
  },

  async createCustomer(data: any) {
    const res = await fetch(`${API_URL}/customers`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<any>(res);
  },

  // Analytics
  async getOverview() {
    const res = await fetch(`${API_URL}/analytics/overview`);
    return handleResponse<{
      metrics: {
        totalRevenue: number;
        totalOrders: number;
        totalCustomers: number;
        totalProducts: number;
      };
      statusCounts: {
        delivered: number;
        shipped: number;
        paid: number;
        pending: number;
        cancelled: number;
      };
      salesSeries: Array<{ label: string; revenue: number; orders: number }>;
      recentOrders: any[];
      topProducts: any[];
    }>(res);
  },
};
