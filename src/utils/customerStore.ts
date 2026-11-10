import { CustomerOrderDetails } from '../types';

const PROFILE_KEY = 'dsm_customer_profile';
const ORDERS_KEY = 'dsm_order_history';

export interface SavedOrderLine {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface SavedOrder {
  id: string;
  placedAt: string;
  items: SavedOrderLine[];
  subtotal: number;
  shippingFee: number;
  orderTotal: number;
  customer: CustomerOrderDetails;
  status: 'Sent on WhatsApp';
}

const emptyProfile = (): CustomerOrderDetails => ({
  customerName: '',
  phone: '',
  email: '',
  pincode: '',
  deliveryAddress: '',
  institutionName: '',
  institutionType: 'Clinic / Nursing Home',
  gstNumber: '',
  notes: '',
});

export const blankProfile = emptyProfile;

export function loadProfile(): CustomerOrderDetails | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CustomerOrderDetails;
    if (!parsed || typeof parsed.customerName !== 'string') return null;
    return { ...emptyProfile(), ...parsed };
  } catch {
    return null;
  }
}

export function saveProfile(details: CustomerOrderDetails) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(details));
}

export function loadOrders(): SavedOrder[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedOrder[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function recordOrder(order: SavedOrder) {
  const next = [order, ...loadOrders()].slice(0, 40);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(next));
}
