import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How does the WhatsApp order process work?',
    answer: 'Simply add your chosen medical equipment or consumables to your cart, fill in your delivery details (Name, Mobile, Address, PIN Code), and click "Proceed to WhatsApp Order". Our system generates a neatly formatted, itemised order summary directly into WhatsApp. Our healthcare sales desk immediately checks live inventory, calculates applicable delivery charges or GST tax benefits, and shares the formal invoice for payment confirmation.',
  },
  {
    question: 'Are all displayed products genuine and medically certified?',
    answer: 'Yes. All products listed on Dr Surya Medicare are sourced directly from verified biomedical manufacturers and authorized distributors. Our diagnostic devices meet CE/ISO standards, and consumables are manufactured in GMP-compliant facilities with batch sterilization certifications.',
  },
  {
    question: 'What is the delivery timeline across Indian PIN codes?',
    answer: 'Orders within major metro hubs (such as Bengaluru, Chennai, Hyderabad, Mumbai, and Delhi NCR) are typically delivered within 1 to 3 business days. For Tier-2 and regional clinic locations, priority courier delivery takes 3 to 5 business days. Heavy equipment (such as ICU beds and suction machines) is dispatched via insured surface logistics.',
  },
  {
    question: 'How do institutional bulk purchases and quotations work?',
    answer: 'For hospitals, diagnostic labs, and corporate clinics requiring bulk supplies or scheduled monthly deliveries, we provide special tiered institutional pricing. Submit a quotation request via our Bulk Orders page or send your procurement list directly on WhatsApp to receive a formal RFQ quotation within 2 to 4 business hours.',
  },
  {
    question: 'What payment modes are accepted once the order is submitted?',
    answer: 'Once our representative confirms your order on WhatsApp, payment can be completed via NEFT/RTGS bank transfer, UPI (Google Pay, PhonePe, Paytm), corporate net banking, or verified Cash-on-Delivery (COD) for eligible serviceable PIN codes.',
  },
  {
    question: 'Can regulated or prescription supplies be ordered online?',
    answer: 'Prescription-only items and regulated clinical pharmaceuticals are strictly enquiry-only and require valid institutional drug license verification prior to processing.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section data-surface="white" className="py-16 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-emerald tracking-wider uppercase mb-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="section-title">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Everything you need to know about our medical ordering process, bulk pricing, and logistics.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-brand-border/80 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm sm:text-base text-brand-forest hover:text-brand-emerald transition-colors"
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full bg-brand-ivory/60 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-brand-softGreen text-brand-emerald' : 'text-brand-muted'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-brand-body/90 leading-relaxed border-t border-brand-border/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
