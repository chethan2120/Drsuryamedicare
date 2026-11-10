import React from 'react';
import { Link } from 'react-router-dom';
import { storeConfig } from '../../config/storeConfig';
import { formatINR } from '../../utils/formatters';

type PolicyKind = 'shipping' | 'returns' | 'privacy' | 'terms';

const titles: Record<PolicyKind, string> = {
  shipping: 'Shipping',
  returns: 'Returns',
  privacy: 'Privacy',
  terms: 'Terms of use',
};

export const PolicyPage: React.FC<{ kind: PolicyKind }> = ({ kind }) => {
  return (
    <article className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-goldInk">Dr Surya Medicare</p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-brand-navy">{titles[kind]}</h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-brand-body">
          {kind === 'shipping' && (
            <>
              <p>
                Standard delivery is listed as {storeConfig.shipping.estimatedDays}. Orders of {formatINR(storeConfig.shipping.freeThreshold)} and above are dispatched without the standard delivery fee. Orders below that amount include a delivery fee of {formatINR(storeConfig.shipping.standardFee)}.
              </p>
              <p>
                Dispatch is arranged from Bengaluru. A 6-digit PIN code check on the product page only confirms that the code looks like an Indian PIN. It does not reserve stock or guarantee a delivery date.
              </p>
            </>
          )}
          {kind === 'returns' && (
            <>
              <p>
                Return and replacement requests are handled by the support desk. Contact {storeConfig.supportPhone} or {storeConfig.supportEmail} with the order reference, product name, and a short description of the issue.
              </p>
              <p>
                Clinical consumables and opened sterile packs may not be returnable. The desk will confirm what can be accepted before a pickup is arranged.
              </p>
            </>
          )}
          {kind === 'privacy' && (
            <>
              <p>
                Account details and order history saved in this browser stay on this device. The site uses them to prefill the cart and show past WhatsApp orders. Clearing site data removes that saved information.
              </p>
              <p>
                Orders are sent through WhatsApp to {storeConfig.whatsappDisplayNumber}. That message includes the products, quantities, and the contact details entered at checkout.
              </p>
            </>
          )}
          {kind === 'terms' && (
            <>
              <p>
                Prices shown in the catalogue are the listed selling prices in INR, per the unit printed on each product. Institutional quantities are quoted separately through the bulk enquiry form.
              </p>
              <p>
                Placing a cart on WhatsApp starts a conversation with the supply desk. It is not a completed payment. The desk confirms availability before dispatch.
              </p>
              <p>
                GSTIN {storeConfig.gstin} and drug licence {storeConfig.drugLicenseDemo} are demonstration values in this project and should not be treated as registered credentials.
              </p>
            </>
          )}
        </div>
        <p className="mt-8 text-sm">
          <Link to="/contact" className="font-semibold text-brand-navy">
            Contact the support desk
          </Link>
        </p>
      </div>
    </article>
  );
};
