import { ENDPOINTS } from '@/utils/apiConfig';

export const authService = {
  async register(payload: any) {
    const response = await fetch(ENDPOINTS.register, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Registration failed');
    return data;
  },

  async login(credentials: any) {
    const response = await fetch(ENDPOINTS.login, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Login failed');
    return data;
  },

  async requestOtp(email: string) {
    const response = await fetch(ENDPOINTS.otp, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'OTP request failed');
    return data;
  },

  async verifyOtp(email: string, otp: string) {
    const response = await fetch(ENDPOINTS.verifyOtp, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'OTP verification failed');
    return data;
  },
  
  async verifyAccount(token: string) {
    const response = await fetch((ENDPOINTS as any).verifyAccount(token), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Verification failed');
    return data;
  },

  async resetPassword(payload: any) {
    const response = await fetch(ENDPOINTS.resetPassword, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Password reset failed');
    return data;
  },

  async getDashboardData() {
    const { token } = this.getSession();
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(ENDPOINTS.dashboard, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid response from server. Expected JSON.");
    }

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch dashboard data');
    return data;
  },

  async getTransactionHistory() {
    const { token } = this.getSession();
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(ENDPOINTS.transactionHistory, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch transaction history');
    return data;
  },

  async getActiveInvestments() {
    const { token } = this.getSession();
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(ENDPOINTS.activeInvestments, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch active investments');
    return data;
  },

  async getProfits() {
    const { token } = this.getSession();
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(ENDPOINTS.profits, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch profits');
    return data;
  },

  async getDeposits() {
    const { token } = this.getSession();
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(ENDPOINTS.deposits, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch deposits');
    return data;
  },

  async getWithdrawals() {
    const { token } = this.getSession();
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(ENDPOINTS.withdrawals, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch withdrawals');
    return data;
  },

  async getReferrals() {
    const { token } = this.getSession();
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(ENDPOINTS.referrals, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch referrals');
    return data;
  },

  async getPaymentMethods() {
    const { token } = this.getSession();
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(ENDPOINTS.paymentMethods, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch payment methods');
    return data;
  },

  async submitDeposit(formData: FormData) {
    const { token } = this.getSession();
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(ENDPOINTS.deposit, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`
      },
      body: formData
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to submit deposit');
    return data;
  },

  async submitWithdrawal(payload: any) {
    const { token } = this.getSession();
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(ENDPOINTS.withdraw, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || data.error || 'Withdrawal failed');
    return data;
  },

  async submitTransfer(payload: any) {
    const { token } = this.getSession();
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(ENDPOINTS.transfer, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || data.error || 'Transfer failed');
    return data;
  },

  async updateProfile(payload: any) {
    const { token } = this.getSession();
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(ENDPOINTS.updateProfile, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Profile update failed');
    return data;
  },

  async getWithdrawalInfo() {
    const { token } = this.getSession();
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(ENDPOINTS.withdrawalInfo, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    });

    if (!response.ok) {
      // If withdrawal info doesn't exist yet, return null instead of throwing or trying to parse HTML
      if (response.status === 404) return null;
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        throw new Error(data.error || 'Failed to fetch withdrawal info');
      } catch (e) {
        throw new Error('Failed to fetch withdrawal info');
      }
    }

    return await response.json();
  },

  async createWithdrawalInfo(payload: any) {
    const { token } = this.getSession();
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(ENDPOINTS.createWithdrawalInfo, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to save withdrawal information');
    return data;
  },

  async getOtherSettings() {
    const { token } = this.getSession();
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(ENDPOINTS.otherSettings, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    });

    if (response.status === 404) return null;

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch settings');
    return data;
  },

  async updateOtherSettings(payload: any) {
    const { token } = this.getSession();
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(ENDPOINTS.updateSettings, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to update settings');
    return data;
  },

  async changePassword(payload: any) {
    const { token } = this.getSession();
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(ENDPOINTS.changePassword, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || data.detail || 'Password change failed');
    return data;
  },

  async getPlans() {
    const { token } = this.getSession();
    if (!token) throw new Error('No authentication token found');
    const response = await fetch(ENDPOINTS.plans, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch plans');
    return data;
  },

  async createInvestment(payload: any) {
    const { token } = this.getSession();
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(ENDPOINTS.createInvestment, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || data.error || 'Failed to create investment');
    return data;
  },

  async submitKyc(payload: any) {
    const { token } = this.getSession();
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(ENDPOINTS.kycSubmit, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`
      },
      body: payload
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || data.error || 'KYC submission failed');
    return data;
  },

  async toggleAutoReinvest(id: number | string) {
    const { token } = this.getSession();
    if (!token) throw new Error('No authentication token found');

    const response = await fetch((ENDPOINTS as any).toggleAutoReinvest(id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || data.error || 'Failed to toggle auto-reinvest');
    return data;
  },

  setSession(token: string, user: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
    }
  },

  getSession() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      const user = localStorage.getItem('auth_user');
      return { token, user: user ? JSON.parse(user) : null };
    }
    return { token: null, user: null };
  },

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      window.location.href = '/login';
    }
  }
};
