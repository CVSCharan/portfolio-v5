"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, GripVertical, Trash2 } from "lucide-react";
import { Reorder } from "framer-motion";

interface AccordionItem {
  id: number | string;
  title: string;
  subtitle?: string;
  [key: string]: any;
}

interface AccordionProps {
  items: AccordionItem[];
  onReorder?: (newOrder: AccordionItem[]) => void;
  onDelete?: (id: number | string) => void;
  renderContent: (item: AccordionItem, index: number) => React.ReactNode;
  title: string;
  onAdd?: () => void;
  addButtonText?: string;
}

export function Accordion({ 
  items, 
  onReorder, 
  onDelete, 
  renderContent,
  title,
  onAdd,
  addButtonText = "Add Item"
}: AccordionProps) {
  const [expandedId, setExpandedId] = useState<number | string | null>(null);

  const toggleExpand = (id: number | string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {onAdd && (
          <button 
            onClick={onAdd}
            type="button"
            className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            {addButtonText}
          </button>
        )}
      </div>

      <div className="p-6">
        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            No items yet. Click "{addButtonText}" to add one.
          </div>
        ) : onReorder ? (
          <Reorder.Group axis="y" values={items} onReorder={onReorder} className="space-y-4">
            {items.map((item, index) => (
              <Reorder.Item key={item.id} value={item}>
                <AccordionItemCard 
                  item={item}
                  isExpanded={expandedId === item.id}
                  onToggle={() => toggleExpand(item.id)}
                  onDelete={onDelete ? () => onDelete(item.id) : undefined}
                  content={renderContent(item, index)}
                  draggable
                />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => (
              <AccordionItemCard 
                key={item.id}
                item={item}
                isExpanded={expandedId === item.id}
                onToggle={() => toggleExpand(item.id)}
                onDelete={onDelete ? () => onDelete(item.id) : undefined}
                content={renderContent(item, index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AccordionItemCard({ 
  item, 
  isExpanded, 
  onToggle, 
  onDelete, 
  content,
  draggable = false
}: { 
  item: AccordionItem; 
  isExpanded: boolean; 
  onToggle: () => void;
  onDelete?: () => void;
  content: React.ReactNode;
  draggable?: boolean;
}) {
  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div 
        className="flex items-center gap-4 p-4 cursor-pointer select-none"
        onClick={onToggle}
      >
        {draggable && (
          <div className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600" onClick={e => e.stopPropagation()}>
            <GripVertical size={20} />
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{item.title}</h3>
          {item.subtitle && <p className="text-sm text-gray-500">{item.subtitle}</p>}
        </div>

        <div className="flex items-center gap-3">
          {onDelete && (
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm("Are you sure you want to delete this?")) {
                  onDelete();
                }
              }}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
          )}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-gray-400"
          >
            <ChevronDown size={20} />
          </motion.div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 pt-0 border-t border-gray-100 bg-gray-50">
              <div className="pt-4">
                {content}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
