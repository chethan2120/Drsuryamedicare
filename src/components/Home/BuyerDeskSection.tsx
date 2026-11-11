import React, { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { storeConfig } from '../../config/storeConfig';
import { formatINR } from '../../utils/formatters';

const steps: { title: string; detail: ReactNode }[] = [
  {
    title: 'Find the items',
    detail: 'Search the catalogue or open the department you supply. Every card uses a product that is already listed.',
  },
  {
    title: 'Check price and quantity',
    detail: 'The price on the card is the catalogue price. Add the quantity the ward, clinic, or lab actually needs.',
  },
  {
    title: 'Send the cart to the desk',
    detail: (
      <>
        The cart is sent on WhatsApp to <span className="whitespace-nowrap">{storeConfig.whatsappDisplayNumber}</span>. The desk confirms stock and payment before dispatch.
      </>
    ),
  },
];

const jobs = [
  {
    title: 'Restock a clinic',
    detail: 'Daily tablets, consumables, and protective supplies from the current catalogue.',
    to: '/shop?category=tablets-daily-health,medical-consumables,ppe',
  },
  {
    title: 'Set up a ward',
    detail: 'Monitoring, respiratory care, and patient-care equipment listed for a ward trolley.',
    to: '/shop?category=monitoring-devices,respiratory-care,patient-care',
  },
  {
    title: 'Prepare a procedure',
    detail: 'Instruments for a minor procedure room, ready to add to the same order.',
    to: '/shop?category=surgical-instruments',
  },
  {
    title: 'Supply a laboratory',
    detail: 'Laboratory equipment that is already in the catalogue, not a separate price list.',
    to: '/shop?category=laboratory-equipment',
  },
];

const ready = [
  'The product name, or the list your store already buys.',
  'How many you need, and the unit on the card (piece, box, or strip).',
  'The city the order should reach.',
  `A phone number. The desk is ${storeConfig.supportPhone}.`,
];

export const BuyerDeskSection: React.FC = () => {
  return (
    <>
      <section className="border-b border-brand-border bg-white" aria-labelledby="order-steps-heading">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-goldInk">How an order moves</p>
          <h2 id="order-steps-heading" className="section-title mt-2 max-w-2xl">
            From the list in your hand to a message the desk can confirm.
          </h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="border border-brand-border bg-brand-ivory p-5">
                <span className="font-heading text-sm font-bold text-brand-goldInk">0{index + 1}</span>
                <h3 className="mt-2 font-heading text-lg font-bold text-brand-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-body">{step.detail}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/shop"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] bg-brand-emerald px-5 text-sm font-semibold text-brand-navy"
            >
              Browse the catalogue
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/cart"
              className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-brand-navy/25 bg-white px-5 text-sm font-semibold text-brand-navy"
            >
              Open your cart
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-brand-border bg-brand-ivory" aria-labelledby="buyer-jobs-heading">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-goldInk">Start from the job</p>
              <h2 id="buyer-jobs-heading" className="section-title mt-2 max-w-xl">
                Open the part of the catalogue that matches today&apos;s list.
              </h2>
            </div>
            <Link to="/categories" className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-brand-navy">
              All departments
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {jobs.map((job) => (
              <Link key={job.title} to={job.to} className="flex h-full flex-col border border-brand-border bg-white p-5">
                <h3 className="font-heading text-lg font-bold text-brand-navy">{job.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-body">{job.detail}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-navy">
                  View products
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-brand-border bg-white" aria-labelledby="ready-heading">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-goldInk">Before you write in</p>
            <h2 id="ready-heading" className="section-title mt-2">
              Four things that make a quotation straightforward.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-body">
              Delivery is listed as {storeConfig.shipping.estimatedDays}, and it is free from {formatINR(storeConfig.shipping.freeThreshold)}.
              A longer list can go through the bulk enquiry instead of the cart.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/bulk-orders"
                className="inline-flex min-h-11 items-center justify-center rounded-[10px] bg-brand-navy px-5 text-sm font-semibold text-brand-ivory"
              >
                Bulk order enquiry
              </Link>
              <Link
                to="/account"
                className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-brand-navy/25 px-5 text-sm font-semibold text-brand-navy"
              >
                Save your details
              </Link>
            </div>
          </div>
          <ul className="divide-y divide-brand-border border-y border-brand-border lg:col-span-7">
            {ready.map((item, index) => (
              <li key={item} className="grid grid-cols-[auto_1fr] gap-4 py-4">
                <span className="font-heading text-sm font-bold text-brand-goldInk">0{index + 1}</span>
                <span className="text-sm leading-relaxed text-brand-navy">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};
