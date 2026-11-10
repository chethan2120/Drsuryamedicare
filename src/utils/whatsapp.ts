import { storeConfig } from '../config/storeConfig';

/**
 * Standardized WhatsApp click-to-chat utility for Dr Surya Medicare
 * Always uses the verified storeConfig.whatsappNumber in international format
 */

export const getWhatsAppUrl = (message: string): string => {
  const cleanNumber = storeConfig.whatsappNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
};

export const getGeneralEnquiryWhatsAppUrl = (): string => {
  return getWhatsAppUrl('Hello Dr Surya Medicare, I would like to know more about your services.');
};

export const getProductEnquiryWhatsAppUrl = (productName: string, sku?: string): string => {
  const skuText = sku ? ` (SKU: ${sku})` : '';
  return getWhatsAppUrl(
    `Hello, I am interested in ${productName}${skuText} from your website. Please share more details and stock availability.`
  );
};

export const getBulkOrderWhatsAppUrl = (productOrDetails?: string): string => {
  const details = productOrDetails ? ` regarding: ${productOrDetails}` : '';
  return getWhatsAppUrl(
    `Hello Dr Surya Medicare, I would like to enquire about bulk medical supplies procurement${details}. Please share wholesale volume pricing and GST invoicing details.`
  );
};

export const getSpecificationEnquiryWhatsAppUrl = (productName: string, sku?: string): string => {
  const skuText = sku ? ` (Model/SKU: ${sku})` : '';
  return getWhatsAppUrl(
    `Hello, I would like to know more about the technical specifications of ${productName}${skuText}. Could you share the clinical spec sheet?`
  );
};

export const getFaqWhatsAppUrl = (topicOrQuestion?: string): string => {
  const topic = topicOrQuestion ? ` regarding "${topicOrQuestion}"` : '';
  return getWhatsAppUrl(
    `Hello, I could not find the information I needed in your FAQs${topic}. Could you please assist me?`
  );
};

export const getManualEnquiryWhatsAppUrl = (productOrDocName: string, sku?: string): string => {
  const skuText = sku ? ` (SKU: ${sku})` : '';
  return getWhatsAppUrl(
    `Hello Dr Surya Medicare Regulatory Desk, I would like to request the official product manual / technical documentation for ${productOrDocName}${skuText}.`
  );
};

export const getBuyingGuideWhatsAppUrl = (guideTitle: string): string => {
  return getWhatsAppUrl(
    `Hello Dr Surya Medicare, I read your buying guide on "${guideTitle}" and would like expert assistance with hospital supplies selection.`
  );
};

export const getProductKnowledgeWhatsAppUrl = (topicTitle: string): string => {
  return getWhatsAppUrl(
    `Hello Dr Surya Medicare Clinical Desk, I have a query regarding your knowledge resource on "${topicTitle}".`
  );
};

export const getContactFormWhatsAppUrl = (data: {
  name: string;
  phone: string;
  email?: string;
  institution?: string;
  subject: string;
  message: string;
}): string => {
  const lines = [
    'Hello Dr Surya Medicare, I am submitting a contact inquiry from your website:',
    `• Name: ${data.name}`,
    `• Phone: ${data.phone}`,
    data.institution ? `• Institution: ${data.institution}` : '',
    data.email ? `• Email: ${data.email}` : '',
    `• Subject: ${data.subject}`,
    `• Inquiry: ${data.message}`,
  ].filter(Boolean);

  return getWhatsAppUrl(lines.join('\n'));
};
