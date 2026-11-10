import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../../data/products';
import { BulkEnquirySubmission, BulkEnquiryItem } from '../../types';
import { isValidIndianMobile, isValidIndianPinCode, generateWhatsAppBulkEnquiryUrl } from '../../utils/formatters';
import { storeConfig } from '../../config/storeConfig';
import confetti from 'canvas-confetti';
import {
  FileSpreadsheet,
  Plus,
  Trash2,
  MessageCircle,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Send,
  HelpCircle,
} from 'lucide-react';

const ORG_TYPES = [
  'Hospital / Healthcare Institution',
  'Private Clinic / Nursing Home',
  'Diagnostic Pathology Laboratory',
  'Medical College / Research Center',
  'Pharmaceutical & Biomedical Company',
  'Government Health Tender',
  'Medical Equipment Distributor',
];

export const BulkOrdersPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const prefillProductId = searchParams.get('prefill');

  const [enquiry, setEnquiry] = useState<BulkEnquirySubmission>({
    organisationName: '',
    contactPerson: '',
    phone: '',
    email: '',
    organisationType: 'Hospital / Healthcare Institution',
    deliveryPincode: '',
    urgency: 'Within 2 Weeks',
    additionalRequirements: '',
    items: [
      {
        productName: 'Dr Surya ProCheck Digital Blood Pressure Monitor with IntelliSense',
        quantity: 10,
        unit: 'Pieces',
        specificationsOrNotes: 'With extra adult wide cuffs',
      },
    ],
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (prefillProductId) {
      const match = products.find((p) => p.id === prefillProductId);
      if (match) {
        setEnquiry((prev) => ({
          ...prev,
          items: [
            {
              productId: match.id,
              productName: match.name,
              quantity: 15,
              unit: `${match.unit}s`,
              specificationsOrNotes: `SKU: ${match.sku} - Requesting bulk unit tier`,
            },
          ],
        }));
      }
    }
  }, [prefillProductId]);

  const handleAddItem = () => {
    setEnquiry((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          productName: '',
          quantity: 10,
          unit: 'Pieces',
          specificationsOrNotes: '',
        },
      ],
    }));
  };

  const handleRemoveItem = (index: number) => {
    if (enquiry.items.length <= 1) return;
    setEnquiry((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleItemChange = (index: number, field: keyof BulkEnquiryItem, value: any) => {
    setEnquiry((prev) => {
      const updated = [...prev.items];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, items: updated };
    });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!enquiry.organisationName.trim()) errs.organisationName = 'Organisation Name is required';
    if (!enquiry.contactPerson.trim()) errs.contactPerson = 'Contact Person is required';
    if (!isValidIndianMobile(enquiry.phone)) errs.phone = 'Valid 10-digit mobile number required';
    if (!enquiry.email.includes('@')) errs.email = 'Valid corporate or hospital email required';
    if (!isValidIndianPinCode(enquiry.deliveryPincode)) errs.deliveryPincode = 'Valid 6-digit Indian PIN required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch {}

    const url = generateWhatsAppBulkEnquiryUrl(enquiry);
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="bg-brand-warmWhite min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-emerald/10 text-brand-emerald text-xs font-bold uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Institutional Procurement Desk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-brand-forest">
            Request a Bulk Purchase Quotation
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-2">
            Custom quotations, GST invoices, and volume pricing for hospitals, nursing homes, and diagnostic laboratories.
          </p>
        </div>

        {/* Quotation Form Container */}
        <div className="bg-white rounded-3xl border border-brand-border/80 p-6 sm:p-10 shadow-card">
          <form onSubmit={handleSubmitWhatsApp} className="space-y-6">
            
            {/* 1. Organisation Information */}
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-base text-brand-forest flex items-center gap-2 border-b border-brand-border pb-2">
                <Building2 className="w-4 h-4 text-brand-emerald" />
                <span>Organisation Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-brand-forest block mb-1">
                    Organisation / Hospital Name <span className="text-brand-vermilion">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={enquiry.organisationName}
                    onChange={(e) => setEnquiry({ ...enquiry, organisationName: e.target.value })}
                    placeholder="e.g. Manipal Healthcare Complex"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-ivory/40 border border-brand-border outline-none focus:border-brand-emerald text-xs font-medium text-brand-forest"
                  />
                  {errors.organisationName && <span className="text-[11px] text-brand-vermilion mt-1 block">{errors.organisationName}</span>}
                </div>

                <div>
                  <label className="font-bold text-brand-forest block mb-1">
                    Organisation Classification <span className="text-brand-vermilion">*</span>
                  </label>
                  <select
                    value={enquiry.organisationType}
                    onChange={(e) => setEnquiry({ ...enquiry, organisationType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-ivory/40 border border-brand-border outline-none focus:border-brand-emerald text-xs font-medium text-brand-forest"
                  >
                    {ORG_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-brand-forest block mb-1">
                    Contact Person Name <span className="text-brand-vermilion">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={enquiry.contactPerson}
                    onChange={(e) => setEnquiry({ ...enquiry, contactPerson: e.target.value })}
                    placeholder="e.g. Dr. A. K. Sundaram (Medical Director)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-ivory/40 border border-brand-border outline-none focus:border-brand-emerald text-xs font-medium text-brand-forest"
                  />
                  {errors.contactPerson && <span className="text-[11px] text-brand-vermilion mt-1 block">{errors.contactPerson}</span>}
                </div>

                <div>
                  <label className="font-bold text-brand-forest block mb-1">
                    Indian Mobile Number <span className="text-brand-vermilion">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={enquiry.phone}
                    onChange={(e) => setEnquiry({ ...enquiry, phone: e.target.value.replace(/[^0-9]/g, '') })}
                    placeholder="e.g. 9845012345"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-ivory/40 border border-brand-border outline-none focus:border-brand-emerald text-xs font-mono font-medium text-brand-forest"
                  />
                  {errors.phone && <span className="text-[11px] text-brand-vermilion mt-1 block">{errors.phone}</span>}
                </div>

                <div>
                  <label className="font-bold text-brand-forest block mb-1">
                    Official Email Address <span className="text-brand-vermilion">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={enquiry.email}
                    onChange={(e) => setEnquiry({ ...enquiry, email: e.target.value })}
                    placeholder="procurement@hospital.org"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-ivory/40 border border-brand-border outline-none focus:border-brand-emerald text-xs font-medium text-brand-forest"
                  />
                  {errors.email && <span className="text-[11px] text-brand-vermilion mt-1 block">{errors.email}</span>}
                </div>

                <div>
                  <label className="font-bold text-brand-forest block mb-1">
                    Delivery PIN Code (India) <span className="text-brand-vermilion">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={enquiry.deliveryPincode}
                    onChange={(e) => setEnquiry({ ...enquiry, deliveryPincode: e.target.value.replace(/[^0-9]/g, '') })}
                    placeholder="e.g. 560034"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-ivory/40 border border-brand-border outline-none focus:border-brand-emerald text-xs font-mono font-medium text-brand-forest"
                  />
                  {errors.deliveryPincode && <span className="text-[11px] text-brand-vermilion mt-1 block">{errors.deliveryPincode}</span>}
                </div>
              </div>
            </div>

            {/* 2. Multi-Product Requirement List */}
            <div className="space-y-4 pt-4 border-t border-brand-border">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-base text-brand-forest flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-brand-emerald" />
                  <span>Required Medical Equipment & Consumables</span>
                </h3>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="text-xs font-bold text-brand-emerald hover:text-brand-emeraldLight flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Another Product</span>
                </button>
              </div>

              <div className="space-y-3">
                {enquiry.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-brand-ivory/40 border border-brand-border/80 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs"
                  >
                    <span className="w-6 h-6 rounded-full bg-brand-forest text-white font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                      {idx + 1}
                    </span>

                    <div className="flex-1 w-full sm:w-auto">
                      <input
                        type="text"
                        required
                        value={item.productName}
                        onChange={(e) => handleItemChange(idx, 'productName', e.target.value)}
                        placeholder="Product name or SKU (e.g. Digital BP Monitor)"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-brand-border text-xs font-semibold text-brand-forest outline-none focus:border-brand-emerald"
                      />
                    </div>

                    <div className="w-24">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => handleItemChange(idx, 'quantity', Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-brand-border text-xs font-bold text-brand-forest text-center outline-none focus:border-brand-emerald"
                      />
                    </div>

                    <div className="w-28">
                      <select
                        value={item.unit}
                        onChange={(e) => handleItemChange(idx, 'unit', e.target.value)}
                        className="w-full px-2 py-2 rounded-xl bg-white border border-brand-border text-xs font-medium text-brand-forest outline-none focus:border-brand-emerald"
                      >
                        <option value="Pieces">Pieces</option>
                        <option value="Boxes">Boxes</option>
                        <option value="Packs">Packs</option>
                        <option value="Sets">Sets</option>
                        <option value="Units">Units</option>
                      </select>
                    </div>

                    <div className="flex-1 w-full sm:w-auto">
                      <input
                        type="text"
                        value={item.specificationsOrNotes || ''}
                        onChange={(e) => handleItemChange(idx, 'specificationsOrNotes', e.target.value)}
                        placeholder="Optional specs / brand preference"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-brand-border text-xs text-brand-body outline-none focus:border-brand-emerald"
                      />
                    </div>

                    {enquiry.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="p-2 text-brand-muted hover:text-brand-vermilion"
                        title="Remove product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Urgency & Additional Requirements */}
            <div className="space-y-4 pt-4 border-t border-brand-border text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-brand-forest block mb-1">
                    Requirement Urgency
                  </label>
                  <select
                    value={enquiry.urgency}
                    onChange={(e) => setEnquiry({ ...enquiry, urgency: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-ivory/40 border border-brand-border outline-none focus:border-brand-emerald text-xs font-medium text-brand-forest"
                  >
                    <option value="Immediate">Immediate Dispatch (Ready Stock)</option>
                    <option value="Within 2 Weeks">Within 2 Weeks</option>
                    <option value="Within 1 Month">Within 1 Month</option>
                    <option value="Quarterly Contract">Quarterly / Standing Rate Contract</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-brand-forest block mb-1">
                    Preferred Mode of Quotation
                  </label>
                  <div className="p-2.5 rounded-xl bg-brand-ivory/40 border border-brand-border text-brand-muted text-xs">
                    Official WhatsApp Submission + Follow-up PDF Proforma on Email
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-brand-forest block mb-1">
                  Additional Tendering Notes / Delivery Specifications
                </label>
                <textarea
                  rows={3}
                  value={enquiry.additionalRequirements}
                  onChange={(e) => setEnquiry({ ...enquiry, additionalRequirements: e.target.value })}
                  placeholder="Mention any custom brand requests, warranty expectations, or hospital inspection terms..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-ivory/40 border border-brand-border outline-none focus:border-brand-emerald text-xs text-brand-forest"
                />
              </div>
            </div>

            {/* Submission Actions */}
            <div className="pt-4 border-t border-brand-border space-y-3">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-brand-emerald hover:bg-brand-emeraldLight text-white font-bold text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2 transform active:scale-98"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Format & Submit Quotation on WhatsApp</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-brand-muted">
                <ShieldCheck className="w-4 h-4 text-brand-emerald" />
                <span>Formal quotations are shared within 2-4 business hours on official letterhead.</span>
              </div>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};
