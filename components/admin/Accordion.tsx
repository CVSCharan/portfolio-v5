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
    <div className="card overflow-hidden">
      <div className="flex justify-between items-center p-6 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        {onAdd && (
          <button 
            onClick={onAdd}
            type="button"
            className="btn btn-primary btn-sm"
          >
            {addButtonText}
          </button>
        )}
      </div>

      <div className="p-6 overflow-x-auto">
        {items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground bg-muted rounded-xl border border-dashed border-border">
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
    <div className="border border-border rounded-xl bg-background overflow-hidden shadow-sm transition-shadow hover:shadow-md">
      <div 
        className="flex items-center gap-4 p-4 cursor-pointer select-none"
        onClick={onToggle}
      >
        {draggable && (
          <div className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground" onClick={e => e.stopPropagation()}>
            <GripVertical size={20} />
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{item.title}</h3>
          {item.subtitle && <p className="text-sm text-muted-foreground">{item.subtitle}</p>}
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
              className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
          )}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-muted-foreground"
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
            <div className="p-4 pt-0 border-t border-border bg-muted/50">
              <div className="pt-4 overflow-x-auto">
                {content}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
