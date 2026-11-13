import React, { useState, useEffect } from 'react';
import { X, CheckSquare, Square, Plus, Trash2, Printer, Sparkles } from 'lucide-react';
import { getStoredChecklist, saveStoredChecklist } from '../utils/storage';

interface ChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

const DEFAULT_ITEMS: Record<string, string[]> = {
  'Essential Travel Documents': [
    'Valid Passport & Physical Photocopies (stored separately)',
    'Travel Insurance Policy with Medical Evacuation Coverage',
    'International Driving Permit (IDP) if hiring self-drive vehicles',
    'Offline Maps & Digital Reservations downloaded to device',
    'Emergency Concierge & Embassy Contact Cards'
  ],
  'Clothing & High-Performance Layers': [
    'Breathable Base Layers (Merino Wool / Capilene)',
    'Windproof & Water-Resistant Outer Shell',
    'Comfortable Break-in Walking / Hiking Footwear',
    'Modest Temple Attire (Shoulder & Knee Coverage Sarongs)',
    'UV Polarized Sunglasses & Packable Sun Hat'
  ],
  'Wellness, Comfort & Field Apothecary': [
    'Electrolyte Hydration Salts & Water Purification Straw',
    'High-SPF Broad Spectrum Sunscreen (Reef Safe)',
    'Prescribed Personal Medications with Doctor’s Note',
    'Natural Botanical Insect Repellent',
    'Silk Sleep Mask & Contoured Earplugs for Transit'
  ],
  'Tech, Photography & Odyssey Gear': [
    'Universal Multi-Plug Travel Adapter with USB-C PD',
    'Compact High-Capacity Power Bank (Airline Approved)',
    'Mirrorless Camera / Extra Memory Cards & Lens Wipes',
    'Waterproof Dry Bag / Backpack Rain Cover',
    'Personal Travel Journal & Archival Ink Pen'
  ]
};

export const ChecklistModal: React.FC<ChecklistModalProps> = ({
  isOpen,
  onClose,
  isDark,
}) => {
  const [itemsState, setItemsState] = useState<Record<string, boolean>>({});
  const [customInput, setCustomInput] = useState('');
  const [customItems, setCustomItems] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setItemsState(getStoredChecklist());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleItem = (item: string) => {
    const updated = { ...itemsState, [item]: !itemsState[item] };
    setItemsState(updated);
    saveStoredChecklist(updated);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const newItem = customInput.trim();
    setCustomItems([...customItems, newItem]);
    const updated = { ...itemsState, [newItem]: false };
    setItemsState(updated);
    saveStoredChecklist(updated);
    setCustomInput('');
  };

  const allItemsList = [
    ...Object.values(DEFAULT_ITEMS).flat(),
    ...customItems,
  ];

  const completedCount = allItemsList.filter((it) => itemsState[it]).length;
  const progressPercent = allItemsList.length > 0 ? Math.round((completedCount / allItemsList.length) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className={`relative w-full max-w-3xl max-h-[88vh] rounded-3xl border shadow-2xl overflow-hidden flex flex-col ${
          isDark ? 'bg-[#0B132B] border-[#D4AF37]/30 text-white' : 'bg-[#FAF8F5] border-[#D6C7B2] text-gray-900'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">
              Preparation Protocol
            </span>
            <h3 className="font-editorial text-2xl font-normal mt-0.5">
              The Discerning Voyager Packing Checklist
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-lg border border-white/10 hover:border-[#D4AF37] text-gray-300 hover:text-white transition-colors"
              title="Print Checklist"
              aria-label="Print checklist"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
              aria-label="Close checklist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-[#D4AF37]">{progressPercent}% Ready</span>
            <span className="text-gray-400">({completedCount} of {allItemsList.length} packed)</span>
          </div>
          <div className="w-48 h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D4AF37] to-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Scrollable Checklist */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {Object.entries(DEFAULT_ITEMS).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-3">
                {category}
              </h4>
              <div className="space-y-2">
                {items.map((item) => {
                  const checked = !!itemsState[item];
                  return (
                    <button
                      key={item}
                      onClick={() => toggleItem(item)}
                      className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center gap-3 ${
                        checked
                          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 line-through opacity-75'
                          : isDark
                            ? 'border-white/10 hover:border-[#D4AF37] bg-white/5 text-gray-200'
                            : 'border-black/10 hover:border-[#9A7B38] bg-white text-gray-800'
                      }`}
                    >
                      {checked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      )}
                      <span>{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Custom Items */}
          {customItems.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#D4AF37] mb-3">
                Personal Additions
              </h4>
              <div className="space-y-2">
                {customItems.map((item) => {
                  const checked = !!itemsState[item];
                  return (
                    <button
                      key={item}
                      onClick={() => toggleItem(item)}
                      className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center gap-3 ${
                        checked
                          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 line-through opacity-75'
                          : 'border-white/10 bg-white/5 text-gray-200'
                      }`}
                    >
                      {checked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      )}
                      <span>{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add custom item form */}
          <form onSubmit={handleAddCustom} className="pt-2 flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Add personal gear or document..."
              className={`flex-1 px-4 py-2.5 rounded-xl border text-xs focus:outline-none ${
                isDark ? 'bg-white/5 border-white/15 text-white focus:border-[#D4AF37]' : 'bg-white border-black/20 text-gray-900 focus:border-[#9A7B38]'
              }`}
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#080E1E] text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/20 flex items-center justify-between text-xs text-gray-400">
          <span>Automatically saved to local browser cache.</span>
          <button onClick={onClose} className="hover:text-white transition-colors">
            Done Packing
          </button>
        </div>
      </div>
    </div>
  );
};
