import { CartItem, CustomerOrderDetails, BulkEnquirySubmission } from '../types';
import { storeConfig } from '../config/storeConfig';

/**
 * Format an amount in Indian Rupees (₹) following Indian number grouping (lakhs, crores).
 * e.g., 2499 -> "₹2,499", 54999 -> "₹54,999"
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Validate standard 6-digit Indian Postal PIN codes.
 */
export function isValidIndianPinCode(pincode: string): boolean {
  const cleaned = pincode.replace(/\s+/g, '');
  return /^[1-9][0-9]{5}$/.test(cleaned);
}

/**
 * Validate standard 10-digit Indian Mobile Numbers (starting with 6, 7, 8, or 9).
 */
export function isValidIndianMobile(phone: string): boolean {
  const cleaned = phone.replace(/[^0-9]/g, '');
  // Allows optional leading 91 or 0
  if (cleaned.length === 10) {
    return /^[6-9][0-9]{9}$/.test(cleaned);
  }
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return /^[6-9][0-9]{9}$/.test(cleaned.substring(2));
  }
  return false;
}

/**
 * Estimate delivery timeline and feasibility based on Indian PIN Code.
 */
export function getPincodeDeliveryInfo(pincode: string): {
  deliverable: boolean;
  cityEstimate?: string;
  daysEstimate?: string;
  codAvailable?: boolean;
} {
  if (!isValidIndianPinCode(pincode)) {
    return { deliverable: false };
  }
  const prefix = pincode.substring(0, 2);
  // Major zones in India
  const zoneMap: Record<string, { zone: string; days: string }> = {
    '56': { zone: 'Bengaluru Metro (Same / Next Day)', days: '1 - 2 Business Days' },
    '57': { zone: 'Karnataka Regional', days: '2 - 3 Business Days' },
    '58': { zone: 'North Karnataka', days: '2 - 4 Business Days' },
    '59': { zone: 'Karnataka Borders', days: '3 - 4 Business Days' },
    '60': { zone: 'Chennai Metro', days: '2 - 3 Business Days' },
    '50': { zone: 'Hyderabad Metro', days: '2 - 3 Business Days' },
    '40': { zone: 'Mumbai Metro', days: '2 - 3 Business Days' },
    '11': { zone: 'Delhi NCR', days: '2 - 4 Business Days' },
    '70': { zone: 'Kolkata Metro', days: '3 - 4 Business Days' },
  };

  const match = zoneMap[prefix];
  if (match) {
    return {
      deliverable: true,
      cityEstimate: match.zone,
      daysEstimate: match.days,
      codAvailable: true,
    };
  }

  return {
    deliverable: true,
    cityEstimate: 'Pan-India Priority Express',
    daysEstimate: '3 - 5 Business Days',
    codAvailable: true,
  };
}

/**
 * Generate official wa.me WhatsApp URL for cart order submission.
 * Exact format requested in Section 12.
 */
export function generateWhatsAppOrderUrl(
  items: CartItem[],
  customer: CustomerOrderDetails,
  subtotal: number,
  shippingFee: number,
  total: number
): string {
  const totalItemsCount = items.reduce((acc, curr) => acc + curr.quantity, 0);

  const productListText = items
    .map((item, index) => {
      const lineTotal = item.product.price * item.quantity;
      return `${index + 1}. ${item.product.name}
SKU: ${item.product.sku}
Quantity: ${item.quantity} ${item.product.unit}${item.quantity > 1 ? 's' : ''}
Price: ${formatINR(item.product.price)}
Subtotal: ${formatINR(lineTotal)}`;
    })
    .join('\n\n');

  const institutionLine = customer.institutionName
    ? `Organisation: ${customer.institutionName} (${customer.institutionType || 'Medical Center'})\n`
    : '';

  const gstLine = customer.gstNumber ? `GSTIN: ${customer.gstNumber}\n` : '';

  const message = `Hello ${storeConfig.businessName},

I would like to place an order.

Customer Name: ${customer.customerName}
Phone: ${customer.phone}
${institutionLine}${gstLine}Delivery Address: ${customer.deliveryAddress}
Delivery PIN Code: ${customer.pincode}

Products:

${productListText}

Total Items: ${totalItemsCount}
Subtotal: ${formatINR(subtotal)}
Estimated Shipping: ${shippingFee === 0 ? 'FREE' : formatINR(shippingFee)}
Estimated Total: ${formatINR(total)}

${customer.notes ? `Special Notes / Requirements: ${customer.notes}\n` : ''}
Please confirm product availability, final pricing and delivery charges.

Thank you.`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${storeConfig.whatsappNumber}?text=${encoded}`;
}

/**
 * Generate WhatsApp URL for Bulk Quotation Enquiries.
 */
export function generateWhatsAppBulkEnquiryUrl(enquiry: BulkEnquirySubmission): string {
  const itemsText = enquiry.items
    .map((item, idx) => {
      const note = item.specificationsOrNotes ? ` (${item.specificationsOrNotes})` : '';
      return `${idx + 1}. ${item.productName} - Qty: ${item.quantity} ${item.unit}${note}`;
    })
    .join('\n');

  const message = `Hello ${storeConfig.businessName},

I would like to request a Bulk Purchase Quotation.

Organisation Name: ${enquiry.organisationName}
Organisation Type: ${enquiry.organisationType}
Contact Person: ${enquiry.contactPerson}
Phone: ${enquiry.phone}
Email: ${enquiry.email}
Delivery PIN Code: ${enquiry.deliveryPincode}
Requirement Urgency: ${enquiry.urgency}

Required Medical Supplies:
${itemsText}

Additional Requirements / Tendering Notes:
${enquiry.additionalRequirements || 'Please share institutional pricing and delivery schedule.'}

Kindly provide the formal quotation with applicable GST rates.

Thank you.`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${storeConfig.whatsappNumber}?text=${encoded}`;
}
