import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, X, Send, RotateCcw, ShieldCheck, ArrowRight, Activity, CheckCircle2 } from 'lucide-react';
import { storeConfig } from '../../config/storeConfig';
import { products } from '../../data/products';
import { formatINR } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  options?: { label: string; actionId: string }[];
  productRecommendation?: {
    id: string;
    name: string;
    price: number;
    sku: string;
    image: string;
    category: string;
  };
}

export const HealthcareAssistantChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Hide both buttons when the Cart Drawer is open
  const { isCartDrawerOpen } = useCart();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      if (messages.length === 0) {
        setMessages([
          {
            id: 'welcome',
            sender: 'bot',
            text: 'Welcome to Dr Surya Medicare Clinical Desk. What healthcare supplies are you looking for?',
            options: [
              { label: 'Tablets & Daily Medicine', actionId: 'menu_tablets' },
              { label: 'Medical Diagnostic Equipment', actionId: 'menu_diagnostic' },
              { label: 'Surgical Instruments & OT Sets', actionId: 'menu_surgical' },
              { label: 'Hospital Consumables & PPE', actionId: 'menu_consumables' },
              { label: 'Institutional Bulk Quote / RFQ', actionId: 'menu_bulk' },
              { label: 'Chat Directly on WhatsApp', actionId: 'menu_direct_whatsapp' },
            ],
          },
        ]);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // If Cart Drawer is open, disappear completely!
  if (isCartDrawerOpen) {
    return null;
  }

  const handleOptionClick = (option: { label: string; actionId: string }) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: option.label,
    };

    let botReply: ChatMessage;

    switch (option.actionId) {
      case 'menu_tablets':
        botReply = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'We stock verified clinical formulations for common health issues. Which formulation do you require?',
          options: [
            { label: 'Fever & Acute Pain (SuryaDolo 650mg)', actionId: 'prod_dolo' },
            { label: 'Acidity & Heartburn (SuryaPan-D)', actionId: 'prod_pand' },
            { label: 'Daily Vital Vitamins (SuryaMax)', actionId: 'prod_multivit' },
            { label: 'Vitamin C + Zinc Chewables', actionId: 'prod_vitc' },
            { label: 'Cold & Allergy (Cetirizine 10mg)', actionId: 'prod_cet' },
            { label: 'ORS Effervescent Electrolyte', actionId: 'prod_ors' },
          ],
        };
        break;

      case 'prod_dolo': {
        const prod = products.find((p) => p.id === 'dsm-tab-01') || products[0];
        botReply = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Recommended antipyretic & pain relief tablet:',
          productRecommendation: {
            id: prod.id,
            name: prod.name,
            price: prod.price,
            sku: prod.sku,
            image: prod.images[0],
            category: prod.categoryName,
          },
          options: [
            { label: 'View Another Tablet', actionId: 'menu_tablets' },
            { label: 'Main Menu', actionId: 'reset_chat' },
          ],
        };
        break;
      }

      case 'prod_pand': {
        const prod = products.find((p) => p.id === 'dsm-tab-02') || products[0];
        botReply = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Recommended enteric coated antacid for acidity and GERD:',
          productRecommendation: {
            id: prod.id,
            name: prod.name,
            price: prod.price,
            sku: prod.sku,
            image: prod.images[0],
            category: prod.categoryName,
          },
          options: [
            { label: 'View Another Tablet', actionId: 'menu_tablets' },
            { label: 'Main Menu', actionId: 'reset_chat' },
          ],
        };
        break;
      }

      case 'prod_multivit': {
        const prod = products.find((p) => p.id === 'dsm-tab-03') || products[0];
        botReply = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Recommended daily vital multivitamin with Zinc and B-Complex:',
          productRecommendation: {
            id: prod.id,
            name: prod.name,
            price: prod.price,
            sku: prod.sku,
            image: prod.images[0],
            category: prod.categoryName,
          },
          options: [
            { label: 'View Another Tablet', actionId: 'menu_tablets' },
            { label: 'Main Menu', actionId: 'reset_chat' },
          ],
        };
        break;
      }

      case 'prod_vitc': {
        const prod = products.find((p) => p.id === 'dsm-tab-04') || products[0];
        botReply = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Recommended Vitamin C 500mg chewable with Zinc:',
          productRecommendation: {
            id: prod.id,
            name: prod.name,
            price: prod.price,
            sku: prod.sku,
            image: prod.images[0],
            category: prod.categoryName,
          },
          options: [
            { label: 'View Another Tablet', actionId: 'menu_tablets' },
            { label: 'Main Menu', actionId: 'reset_chat' },
          ],
        };
        break;
      }

      case 'prod_cet': {
        const prod = products.find((p) => p.id === 'dsm-tab-05') || products[0];
        botReply = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Recommended Cetirizine 10mg for cold, sneezing, and allergies:',
          productRecommendation: {
            id: prod.id,
            name: prod.name,
            price: prod.price,
            sku: prod.sku,
            image: prod.images[0],
            category: prod.categoryName,
          },
          options: [
            { label: 'View Another Tablet', actionId: 'menu_tablets' },
            { label: 'Main Menu', actionId: 'reset_chat' },
          ],
        };
        break;
      }

      case 'prod_ors': {
        const prod = products.find((p) => p.id === 'dsm-tab-06') || products[0];
        botReply = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Recommended WHO-formula effervescent electrolyte tube:',
          productRecommendation: {
            id: prod.id,
            name: prod.name,
            price: prod.price,
            sku: prod.sku,
            image: prod.images[0],
            category: prod.categoryName,
          },
          options: [
            { label: 'View Another Tablet', actionId: 'menu_tablets' },
            { label: 'Main Menu', actionId: 'reset_chat' },
          ],
        };
        break;
      }

      case 'menu_diagnostic':
        botReply = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Precision clinical diagnostic tools. Which instrument are you looking for?',
          options: [
            { label: 'Digital Upper Arm BP Monitor', actionId: 'prod_bp' },
            { label: 'Cardiology Stainless Stethoscope', actionId: 'prod_steth' },
            { label: 'OLED Fingertip Pulse Oximeter', actionId: 'prod_oxi' },
            { label: 'Infrared Non-Contact Thermometer', actionId: 'prod_therm' },
            { label: '12-Lead Diagnostic ECG Machine', actionId: 'prod_ecg' },
          ],
        };
        break;

      case 'prod_bp': {
        const prod = products.find((p) => p.id === 'dsm-bp-01') || products[0];
        botReply = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Clinical IntelliSense Digital BP Monitor with irregular pulse detection:',
          productRecommendation: {
            id: prod.id,
            name: prod.name,
            price: prod.price,
            sku: prod.sku,
            image: prod.images[0],
            category: prod.categoryName,
          },
          options: [
            { label: 'View Diagnostic Tools', actionId: 'menu_diagnostic' },
            { label: 'Main Menu', actionId: 'reset_chat' },
          ],
        };
        break;
      }

      case 'prod_steth': {
        const prod = products.find((p) => p.id === 'dsm-steth-01') || products[0];
        botReply = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Master Cardiology Dual-Head Stainless Steel Stethoscope:',
          productRecommendation: {
            id: prod.id,
            name: prod.name,
            price: prod.price,
            sku: prod.sku,
            image: prod.images[0],
            category: prod.categoryName,
          },
          options: [
            { label: 'View Diagnostic Tools', actionId: 'menu_diagnostic' },
            { label: 'Main Menu', actionId: 'reset_chat' },
          ],
        };
        break;
      }

      case 'prod_oxi': {
        const prod = products.find((p) => p.id === 'dsm-oxi-01') || products[0];
        botReply = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'OLED Fingertip Pulse Oximeter with Perfusion Index waveform:',
          productRecommendation: {
            id: prod.id,
            name: prod.name,
            price: prod.price,
            sku: prod.sku,
            image: prod.images[0],
            category: prod.categoryName,
          },
          options: [
            { label: 'View Diagnostic Tools', actionId: 'menu_diagnostic' },
            { label: 'Main Menu', actionId: 'reset_chat' },
          ],
        };
        break;
      }

      case 'prod_therm': {
        const prod = products.find((p) => p.id === 'dsm-therm-01') || products[0];
        botReply = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Non-Contact Infrared Forehead Thermometer (1-second readout):',
          productRecommendation: {
            id: prod.id,
            name: prod.name,
            price: prod.price,
            sku: prod.sku,
            image: prod.images[0],
            category: prod.categoryName,
          },
          options: [
            { label: 'View Diagnostic Tools', actionId: 'menu_diagnostic' },
            { label: 'Main Menu', actionId: 'reset_chat' },
          ],
        };
        break;
      }

      case 'prod_ecg': {
        const prod = products.find((p) => p.id === 'dsm-ecg-01') || products[0];
        botReply = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'CardioSmart 12-Lead Diagnostic ECG Machine with thermal printer:',
          productRecommendation: {
            id: prod.id,
            name: prod.name,
            price: prod.price,
            sku: prod.sku,
            image: prod.images[0],
            category: prod.categoryName,
          },
          options: [
            { label: 'View Diagnostic Tools', actionId: 'menu_diagnostic' },
            { label: 'Main Menu', actionId: 'reset_chat' },
          ],
        };
        break;
      }

      case 'menu_surgical':
        botReply = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Surgical stainless steel instruments. Select your category:',
          options: [
            { label: 'Minor Surgery General OT Set (32 Pcs)', actionId: 'prod_ot_set' },
            { label: 'Sterile Scalpel Blades #11 (Box of 100)', actionId: 'prod_scalpel' },
            { label: 'Castroviejo Micro Needle Holder', actionId: 'prod_needle' },
          ],
        };
        break;

      case 'prod_ot_set': {
        const prod = products.find((p) => p.id === 'dsm-surg-01') || products[0];
        botReply = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Complete 32-piece German stainless minor OT kit with sterilizing tray:',
          productRecommendation: {
            id: prod.id,
            name: prod.name,
            price: prod.price,
            sku: prod.sku,
            image: prod.images[0],
            category: prod.categoryName,
          },
          options: [
            { label: 'Surgical Supplies Menu', actionId: 'menu_surgical' },
            { label: 'Main Menu', actionId: 'reset_chat' },
          ],
        };
        break;
      }

      case 'prod_scalpel': {
        const prod = products.find((p) => p.id === 'dsm-scalpel-01') || products[0];
        botReply = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Gamma-sterilized surgical scalpel blades #11 (Box of 100):',
          productRecommendation: {
            id: prod.id,
            name: prod.name,
            price: prod.price,
            sku: prod.sku,
            image: prod.images[0],
            category: prod.categoryName,
          },
          options: [
            { label: 'Surgical Supplies Menu', actionId: 'menu_surgical' },
            { label: 'Main Menu', actionId: 'reset_chat' },
          ],
        };
        break;
      }

      case 'prod_needle': {
        const prod = products.find((p) => p.id === 'dsm-needle-01') || products[0];
        botReply = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Castroviejo micro-surgical needle holder with tungsten carbide jaws:',
          productRecommendation: {
            id: prod.id,
            name: prod.name,
            price: prod.price,
            sku: prod.sku,
            image: prod.images[0],
            category: prod.categoryName,
          },
          options: [
            { label: 'Surgical Supplies Menu', actionId: 'menu_surgical' },
            { label: 'Main Menu', actionId: 'reset_chat' },
          ],
        };
        break;
      }

      case 'menu_consumables':
        botReply = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Hospital consumables and PPE. Select an item:',
          options: [
            { label: 'Powder-Free Nitrile Examination Gloves (Box of 100)', actionId: 'prod_gloves' },
            { label: '3-Ply Ultrasonic Surgical Masks (Pack of 50)', actionId: 'prod_mask' },
            { label: '5ml Auto-Disable Sterile Syringes (Box of 100)', actionId: 'prod_syringe' },
            { label: 'Vented IV Infusion Administration Sets', actionId: 'prod_iv' },
          ],
        };
        break;

      case 'prod_gloves': {
        const prod = products.find((p) => p.id === 'dsm-gloves-01') || products[0];
        botReply = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Powder-free medical nitrile examination gloves (100 gloves/box):',
          productRecommendation: {
            id: prod.id,
            name: prod.name,
            price: prod.price,
            sku: prod.sku,
            image: prod.images[0],
            category: prod.categoryName,
          },
          options: [
            { label: 'Consumables Menu', actionId: 'menu_consumables' },
            { label: 'Main Menu', actionId: 'reset_chat' },
          ],
        };
        break;
      }

      case 'prod_mask': {
        const prod = products.find((p) => p.id === 'dsm-mask-01') || products[0];
        botReply = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'BFE ≥ 99% certified 3-ply meltblown surgical masks (50 masks/pack):',
          productRecommendation: {
            id: prod.id,
            name: prod.name,
            price: prod.price,
            sku: prod.sku,
            image: prod.images[0],
            category: prod.categoryName,
          },
          options: [
            { label: 'Consumables Menu', actionId: 'menu_consumables' },
            { label: 'Main Menu', actionId: 'reset_chat' },
          ],
        };
        break;
      }

      case 'prod_syringe': {
        const prod = products.find((p) => p.id === 'dsm-syring-01') || products[0];
        botReply = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: '5ml sterile single-use disposable syringes with 23G needle (100 units/box):',
          productRecommendation: {
            id: prod.id,
            name: prod.name,
            price: prod.price,
            sku: prod.sku,
            image: prod.images[0],
            category: prod.categoryName,
          },
          options: [
            { label: 'Consumables Menu', actionId: 'menu_consumables' },
            { label: 'Main Menu', actionId: 'reset_chat' },
          ],
        };
        break;
      }

      case 'prod_iv': {
        const prod = products.find((p) => p.id === 'dsm-iv-01') || products[0];
        botReply = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Vented IV gravity infusion administration sets with fluid filter (Pack of 25):',
          productRecommendation: {
            id: prod.id,
            name: prod.name,
            price: prod.price,
            sku: prod.sku,
            image: prod.images[0],
            category: prod.categoryName,
          },
          options: [
            { label: 'Consumables Menu', actionId: 'menu_consumables' },
            { label: 'Main Menu', actionId: 'reset_chat' },
          ],
        };
        break;
      }

      case 'menu_bulk':
        botReply = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'For hospitals, nursing homes, and laboratories, we provide volume wholesale pricing, GST invoices, and scheduled consignments.',
          options: [
            { label: 'Open Bulk RFQ Quotation Builder', actionId: 'go_to_bulk' },
            { label: 'Chat with Institutional Desk on WhatsApp', actionId: 'menu_direct_whatsapp' },
            { label: 'Main Menu', actionId: 'reset_chat' },
          ],
        };
        break;

      case 'go_to_bulk':
        setIsOpen(false);
        navigate('/bulk-orders');
        return;

      case 'menu_direct_whatsapp': {
        const url = `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent('Hello Dr Surya Medicare, I would like assistance with clinical supplies procurement.')}`;
        window.open(url, '_blank', 'noopener,noreferrer');
        botReply = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Opening WhatsApp chat with our medical desk. How else can we assist you?',
          options: [{ label: 'Return to Main Menu', actionId: 'reset_chat' }],
        };
        break;
      }

      case 'reset_chat':
      default:
        botReply = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'What healthcare supplies are you looking for?',
          options: [
            { label: 'Tablets & Daily Medicine', actionId: 'menu_tablets' },
            { label: 'Medical Diagnostic Equipment', actionId: 'menu_diagnostic' },
            { label: 'Surgical Instruments & OT Sets', actionId: 'menu_surgical' },
            { label: 'Hospital Consumables & PPE', actionId: 'menu_consumables' },
            { label: 'Institutional Bulk Quote / RFQ', actionId: 'menu_bulk' },
            { label: 'Chat Directly on WhatsApp', actionId: 'menu_direct_whatsapp' },
          ],
        };
        break;
    }

    setMessages((prev) => [...prev, userMsg, botReply]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText('');

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
    };

    const q = userText.toLowerCase();
    const matched = products.find(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.searchKeywords.some((k) => k.toLowerCase().includes(q))
    );

    let botReply: ChatMessage;

    if (matched) {
      botReply = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: `Matching product for "${userText}":`,
        productRecommendation: {
          id: matched.id,
          name: matched.name,
          price: matched.price,
          sku: matched.sku,
          image: matched.images[0],
          category: matched.categoryName,
        },
        options: [
          { label: 'Browse All Products', actionId: 'go_to_shop' },
          { label: 'Order on WhatsApp', actionId: 'menu_direct_whatsapp' },
          { label: 'Main Menu', actionId: 'reset_chat' },
        ],
      };
    } else {
      botReply = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: `Thank you for your inquiry regarding "${userText}". Our medical support desk is available on WhatsApp to assist with exact stock availability and institutional volume pricing.`,
        options: [
          { label: 'Continue on WhatsApp', actionId: 'menu_direct_whatsapp' },
          { label: 'View Tablets & Daily Medicine', actionId: 'menu_tablets' },
          { label: 'View Diagnostic Equipment', actionId: 'menu_diagnostic' },
          { label: 'Main Menu', actionId: 'reset_chat' },
        ],
      };
    }

    setMessages((prev) => [...prev, userMsg, botReply]);
  };

  const handleOpenProduct = (productId: string) => {
    setIsOpen(false);
    navigate(`/product/${productId}`);
  };

  const handleDirectWhatsAppForProduct = (prodName: string, sku: string, price: number) => {
    const msg = `Hello Dr Surya Medicare, I would like to order: ${prodName} (SKU: ${sku}, Price: ${formatINR(price)}). Please confirm stock and delivery timeline.`;
    const url = `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* ========================================================= */}
      {/* FLOATING ACTION BUTTONS ON BOTTOM-RIGHT                   */}
      {/* Official WhatsApp at the bottom, Chatbot button above it!  */}
      {/* Both disappear when Cart Drawer is open                   */}
      {/* ========================================================= */}
      <div className="fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        
        {/* 1. Healthcare Assistant Chatbot Launcher (ABOVE WhatsApp) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2.5 rounded-full bg-brand-forest hover:bg-brand-emerald text-white flex items-center gap-2 shadow-modal hover:scale-105 active:scale-95 transition-all font-bold text-xs border border-brand-emerald/40"
          aria-label="Toggle Healthcare Assistant"
        >
          <MessageSquare className="w-4 h-4 text-brand-ivory" />
          <span className="hidden sm:inline">Healthcare Assistant</span>
          {isOpen ? <X className="w-3.5 h-3.5 ml-1" /> : <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
        </button>

        {/* 2. Official WhatsApp Button (AT THE VERY BOTTOM) */}
        <a
          href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent('Hello Dr Surya Medicare, I would like to place an order or ask a question regarding medical supplies.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-modal hover:scale-108 active:scale-95 transition-all group"
          title="Chat directly on WhatsApp"
          aria-label="Official WhatsApp Support"
        >
          {/* Official WhatsApp SVG Logo */}
          <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 fill-white">
            <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.954 1.18-.175.201-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.495-.896-.799-1.501-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.201-.301.301-.502.1-.201.05-.376-.025-.526-.075-.15-.678-1.634-.929-2.239-.245-.589-.494-.509-.678-.519-.176-.01-.376-.01-.577-.01-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.511 1.079 2.912 1.23 3.113c.15.201 2.122 3.24 5.141 4.544.718.31 1.279.496 1.716.635.722.23 1.378.197 1.898.12.58-.088 1.78-.727 2.03-1.43.251-.703.251-1.306.176-1.431-.076-.126-.277-.202-.578-.352zM12 21.6c-1.8 0-3.565-.486-5.111-1.408l-.367-.218-3.799.996 1.014-3.703-.239-.38A9.555 9.555 0 0 1 2.4 12c0-5.293 4.307-9.6 9.6-9.6 5.293 0 9.6 4.307 9.6 9.6 0 5.293-4.307 9.6-9.6 9.6zM12 0C5.373 0 0 5.373 0 12c0 2.115.549 4.16 1.594 5.968L0 24l6.236-1.636A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
          </svg>
        </a>

      </div>

      {/* Interactive Chatbot Modal Window */}
      {isOpen && (
        <div className="fixed bottom-36 right-4 z-50 flex h-[500px] max-h-[75vh] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-brand-border bg-brand-warmWhite shadow-modal animate-fade-in sm:bottom-28 sm:right-6">
          
          {/* Chat Header */}
          <div className="bg-brand-forest text-brand-ivory p-4 flex items-center justify-between border-b border-brand-emerald/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-emerald text-white flex items-center justify-center font-bold">
                <Activity className="w-4 h-4 text-brand-ivory" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-brand-warmWhite leading-tight">
                  Dr Surya Healthcare Assistant
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-brand-ivory/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online • Medical Procurement Desk</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleOptionClick({ label: 'Reset', actionId: 'reset_chat' })}
                className="p-1.5 rounded-lg hover:bg-brand-emerald/40 text-brand-ivory/80 hover:text-white"
                title="Restart Chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-brand-emerald/40 text-brand-ivory/80 hover:text-white"
                title="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Flow Container */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* Bubble text */}
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-brand-emerald text-white rounded-tr-xs shadow-xs font-medium'
                      : 'bg-white text-brand-forest rounded-tl-xs border border-brand-border/80 shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Optional Product Recommendation Card */}
                {msg.productRecommendation && (
                  <div className="mt-2 w-full max-w-[280px] bg-white rounded-2xl p-3 border border-brand-emerald/40 shadow-card space-y-2">
                    <div className="aspect-video w-full rounded-xl overflow-hidden bg-brand-ivory/50">
                      <img
                        src={msg.productRecommendation.image}
                        alt={msg.productRecommendation.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-brand-emerald uppercase block">
                        {msg.productRecommendation.category}
                      </span>
                      <h5 className="font-heading font-bold text-xs text-brand-forest line-clamp-2">
                        {msg.productRecommendation.name}
                      </h5>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-sm font-extrabold text-brand-emerald">
                          {formatINR(msg.productRecommendation.price)}
                        </span>
                        <span className="text-[10px] text-brand-muted font-mono">
                          {msg.productRecommendation.sku}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                      <button
                        type="button"
                        onClick={() => handleOpenProduct(msg.productRecommendation!.id)}
                        className="py-1.5 px-2 rounded-lg bg-brand-ivory hover:bg-brand-border text-brand-forest text-[11px] font-bold text-center border border-brand-border"
                      >
                        Details
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleDirectWhatsAppForProduct(
                            msg.productRecommendation!.name,
                            msg.productRecommendation!.sku,
                            msg.productRecommendation!.price
                          )
                        }
                        className="py-1.5 px-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-[11px] font-bold text-center flex items-center justify-center gap-1"
                      >
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Interactive Decision Options */}
                {msg.options && (
                  <div className="mt-2 flex flex-col gap-1.5 w-full max-w-[92%]">
                    {msg.options.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleOptionClick(opt)}
                        className="w-full text-left p-2 rounded-xl bg-white hover:bg-brand-softGreen text-brand-forest hover:text-brand-emerald border border-brand-border/80 text-[11px] font-semibold transition-all shadow-xs flex items-center justify-between"
                      >
                        <span className="line-clamp-1">{opt.label}</span>
                        <ArrowRight className="w-3 h-3 text-brand-muted flex-shrink-0 ml-1" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Chat Input */}
          <form onSubmit={handleSendMessage} className="p-2.5 bg-white border-t border-brand-border flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask for tablets, gloves, BP monitor..."
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-brand-ivory/50 border border-brand-border outline-none focus:border-brand-emerald font-medium text-brand-forest"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-white shadow-xs"
              title="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};