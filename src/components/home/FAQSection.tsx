
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-24 bg-black">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-400">
            Everything you need to know about VoltStream
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openItems.includes(faq.id);
            
            return (
              <div 
                key={faq.id}
                className="bg-[#161616] border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-colors"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#1A1A1A] transition-colors"
                >
                  <span className="font-semibold text-white pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={cn(
                      "w-5 h-5 text-gray-400 transition-transform flex-shrink-0",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                
                <div className={cn(
                  "overflow-hidden transition-all duration-200 ease-in-out",
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}>
                  <div className="px-6 pb-4 text-gray-300 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
