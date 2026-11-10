import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { formatINR } from '../../utils/formatters';
import {
  blankProfile,
  loadOrders,
  loadProfile,
  saveProfile,
  SavedOrder,
} from '../../utils/customerStore';
import { CustomerOrderDetails } from '../../types';
import {
  User,
  MapPin,
  Heart,
  FileSpreadsheet,
  Building2,
  Package,
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');
  const { wishlistCount } = useWishlist();
  const [profile, setProfile] = useState<CustomerOrderDetails>(() => loadProfile() ?? blankProfile());
  const [orders, setOrders] = useState<SavedOrder[]>(() => loadOrders());
  const [savedNote, setSavedNote] = useState('');

  const hasProfile = Boolean(profile.customerName.trim() || profile.phone.trim() || profile.deliveryAddress.trim());

  const update = (patch: Partial<CustomerOrderDetails>) => {
    setProfile((current) => ({ ...current, ...patch }));
    setSavedNote('');
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    saveProfile(profile);
    setSavedNote('Saved on this device. The cart will use these details next time you order.');
    setOrders(loadOrders());
  };

  return (
    <div className="min-h-screen bg-brand-warmWhite py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-extrabold text-brand-forest sm:text-3xl">Your account</h1>
          <p className="mt-1 text-sm text-brand-muted">
            Save a name, mobile number, and delivery address. They fill the order form automatically, and every order you send is kept here.
          </p>
        </div>

        <div className="grid items-start gap-8 md:grid-cols-12">
          <div className="space-y-4 rounded-3xl border border-brand-border/80 bg-white p-5 shadow-card md:col-span-4">
            <div className="flex items-center gap-3.5 border-b border-brand-border pb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-softGreen text-brand-emerald">
                <User className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h3 className="truncate font-heading text-sm font-bold text-brand-forest">
                  {profile.customerName.trim() || 'No name saved yet'}
                </h3>
                <span className="block truncate text-xs text-brand-muted">
                  {profile.phone.trim() || 'Add a mobile number'}
                </span>
              </div>
            </div>

            <nav className="space-y-1 text-xs">
              <button type="button" onClick={() => setActiveTab('profile')} className={`flex min-h-11 w-full items-center gap-2 rounded-xl px-3.5 py-2.5 text-left font-bold ${activeTab === 'profile' ? 'bg-brand-emerald text-white' : 'text-brand-forest hover:bg-brand-ivory/60'}`}>
                <Building2 className="h-4 w-4" /> Facility profile
              </button>
              <button type="button" onClick={() => { setOrders(loadOrders()); setActiveTab('orders'); }} className={`flex min-h-11 w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left font-bold ${activeTab === 'orders' ? 'bg-brand-emerald text-white' : 'text-brand-forest hover:bg-brand-ivory/60'}`}>
                <span className="flex items-center gap-2"><FileSpreadsheet className="h-4 w-4" /> Order history</span>
                <span className="rounded bg-white/20 px-1.5 py-0.5 font-mono text-[10px]">{orders.length}</span>
              </button>
              <button type="button" onClick={() => setActiveTab('addresses')} className={`flex min-h-11 w-full items-center gap-2 rounded-xl px-3.5 py-2.5 text-left font-bold ${activeTab === 'addresses' ? 'bg-brand-emerald text-white' : 'text-brand-forest hover:bg-brand-ivory/60'}`}>
                <MapPin className="h-4 w-4" /> Delivery address
              </button>
              <Link to="/wishlist" className="flex min-h-11 w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left font-bold text-brand-forest hover:bg-brand-ivory/60">
                <span className="flex items-center gap-2"><Heart className="h-4 w-4 text-brand-vermilion" /> Saved wishlist</span>
                <span className="rounded bg-brand-ivory px-1.5 py-0.5 font-mono text-[10px] text-brand-forest">{wishlistCount}</span>
              </Link>
            </nav>
            <p className="border-t border-brand-border pt-3 text-[11px] leading-relaxed text-brand-muted">
              Details stay on this browser. They are not sent until you place an order.
            </p>
          </div>

          <div className="rounded-3xl border border-brand-border/80 bg-white p-6 shadow-card sm:p-8 md:col-span-8">
            {activeTab === 'profile' && (
              <form onSubmit={handleSave} className="space-y-4">
                <h2 className="border-b border-brand-border pb-3 font-heading text-lg font-bold text-brand-forest">Details used on the next order</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-semibold text-brand-muted">
                    Contact name
                    <input value={profile.customerName} onChange={(e) => update({ customerName: e.target.value })} className="mt-1 w-full rounded-xl border border-brand-border px-3 text-sm text-brand-forest" />
                  </label>
                  <label className="block text-xs font-semibold text-brand-muted">
                    Mobile number
                    <input value={profile.phone} inputMode="numeric" onChange={(e) => update({ phone: e.target.value.replace(/[^0-9]/g, '').slice(0, 10) })} className="mt-1 w-full rounded-xl border border-brand-border px-3 text-sm text-brand-forest" />
                  </label>
                  <label className="block text-xs font-semibold text-brand-muted">
                    Email
                    <input type="email" value={profile.email || ''} onChange={(e) => update({ email: e.target.value })} className="mt-1 w-full rounded-xl border border-brand-border px-3 text-sm text-brand-forest" />
                  </label>
                  <label className="block text-xs font-semibold text-brand-muted">
                    PIN code
                    <input value={profile.pincode} inputMode="numeric" onChange={(e) => update({ pincode: e.target.value.replace(/[^0-9]/g, '').slice(0, 6) })} className="mt-1 w-full rounded-xl border border-brand-border px-3 text-sm text-brand-forest" />
                  </label>
                  <label className="block text-xs font-semibold text-brand-muted sm:col-span-2">
                    Facility or clinic name
                    <input value={profile.institutionName || ''} onChange={(e) => update({ institutionName: e.target.value })} className="mt-1 w-full rounded-xl border border-brand-border px-3 text-sm text-brand-forest" />
                  </label>
                  <label className="block text-xs font-semibold text-brand-muted sm:col-span-2">
                    Delivery address
                    <textarea value={profile.deliveryAddress} onChange={(e) => update({ deliveryAddress: e.target.value })} rows={3} className="mt-1 w-full rounded-xl border border-brand-border px-3 py-2 text-sm text-brand-forest" />
                  </label>
                  <label className="block text-xs font-semibold text-brand-muted sm:col-span-2">
                    GSTIN, if you need it on the invoice
                    <input value={profile.gstNumber || ''} onChange={(e) => update({ gstNumber: e.target.value.toUpperCase() })} className="mt-1 w-full rounded-xl border border-brand-border px-3 text-sm text-brand-forest" />
                  </label>
                </div>
                <button type="submit" className="inline-flex min-h-11 items-center rounded-full bg-brand-teal px-5 text-sm font-semibold text-white">
                  Save details
                </button>
                {savedNote && <p className="text-sm text-brand-teal">{savedNote}</p>}
              </form>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h2 className="border-b border-brand-border pb-3 font-heading text-lg font-bold text-brand-forest">Order history</h2>
                {orders.length === 0 ? (
                  <div className="rounded-2xl bg-brand-ivory p-6 text-sm text-brand-muted">
                    <Package className="mb-3 h-6 w-6 text-brand-teal" />
                    No orders yet. When you send a cart or a product on WhatsApp, it is listed here with the items, quantity, and total.
                    <Link to="/shop" className="mt-3 block font-semibold text-brand-teal">Browse the catalogue</Link>
                  </div>
                ) : (
                  orders.map((order) => (
                    <article key={order.id} className="space-y-3 rounded-2xl border border-brand-border bg-brand-ivory/40 p-4 text-sm">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <p className="font-mono text-sm font-bold text-brand-forest">{order.id}</p>
                          <p className="text-xs text-brand-muted">{new Date(order.placedAt).toLocaleString('en-IN')}</p>
                        </div>
                        <span className="rounded-full bg-brand-softGreen px-2.5 py-1 text-[11px] font-semibold text-brand-emerald">{order.status}</span>
                      </div>
                      <ul className="space-y-1 text-xs text-brand-muted">
                        {order.items.map((item) => (
                          <li key={`${order.id}-${item.id}`}>{item.name} × {item.quantity}</li>
                        ))}
                      </ul>
                      <div className="flex justify-between border-t border-brand-border/70 pt-2 font-semibold text-brand-forest">
                        <span>{order.customer.customerName}</span>
                        <span>{formatINR(order.orderTotal)}</span>
                      </div>
                    </article>
                  ))
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <h2 className="border-b border-brand-border pb-3 font-heading text-lg font-bold text-brand-forest">Default delivery address</h2>
                {!hasProfile ? (
                  <p className="text-sm text-brand-muted">Save a profile first. That address is the one the cart uses.</p>
                ) : (
                  <div className="rounded-2xl border border-brand-border bg-brand-ivory/40 p-4 text-sm">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-bold text-brand-forest">{profile.institutionName || profile.customerName || 'Saved address'}</span>
                      <span className="rounded bg-brand-softGreen px-2 py-0.5 text-[10px] font-bold text-brand-emerald">DEFAULT</span>
                    </div>
                    <p className="leading-relaxed text-brand-muted">{profile.deliveryAddress || 'No street address yet.'}</p>
                    <p className="mt-2 text-xs text-brand-muted">
                      {profile.phone ? `+91 ${profile.phone}` : 'No number saved'}{profile.pincode ? ` · PIN ${profile.pincode}` : ''}
                    </p>
                    <button type="button" onClick={() => setActiveTab('profile')} className="mt-4 text-sm font-semibold text-brand-teal">Edit details</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
