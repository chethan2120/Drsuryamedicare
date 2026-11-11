import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { storeConfig } from '../../config/storeConfig';
import { formatINR } from '../../utils/formatters';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How does the WhatsApp order process work?',
    answer: `Add products to the cart, enter the delivery details, and send the order on WhatsApp to ${storeConfig.whatsappDisplayNumber}. That message starts the order. It is not a completed payment.`,
  },
  {
    question: 'Are certifications shown for every product?',
    answer: 'Only the details stored on each product are shown, including its description and specification table. This site does not add certificates that are not already in that product record.',
  },
  {
    question: 'What is the delivery timeline?',
    answer: `The listed delivery window is ${storeConfig.shipping.estimatedDays}. Orders from ${formatINR(storeConfig.shipping.freeThreshold)} are sent without the standard delivery fee of ${formatINR(storeConfig.shipping.standardFee)}.`,
  },
  {
    question: 'How do institutional bulk purchases work?',
    answer: 'Use the bulk enquiry form to send organisation details, products, and quantities. The sales desk replies with a quotation. There is no automatic volume price on the product page.',
  },
  {
    question: 'How is payment handled?',
    answer: 'Payment is confirmed with the sales desk after the WhatsApp order is sent. This website does not take card payments.',
  },
  {
    question: 'Can prescription supplies be ordered from the catalogue?',
    answer: 'Products marked for quotation stay on the enquiry form. The desk confirms what can be supplied before dispatch.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section data-surface="white" data-reveal="fade" className="cv-auto bg-white py-16 sm:py-20">
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
