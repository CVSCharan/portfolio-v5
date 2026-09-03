"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Trash2, ArrowUp, ArrowDown, Save } from "lucide-react";

interface AdminEditCardProps {
  title: string;
  subtitle?: string;
  isExpanded?: boolean;
  onToggle?: () => void;
  onDelete?: () => void;
  onUp?: () => void;
  onDown?: () => void;
  isDirty: boolean;
  isSaving: boolean;
  onSave: () => Promise<void> | void;
  children: React.ReactNode;
}

export function AdminEditCard({
  title,
  subtitle,
  isExpanded = false,
  onToggle,
  onDelete,
  onUp,
  onDown,
  isDirty,
  isSaving,
  onSave,
  children,
}: AdminEditCardProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
    <div className="card overflow-hidden bg-background transition-colors focus-within:border-foreground/30">
      {/* Summary View / Header */}
      <div 
        className="flex items-center gap-4 p-4 cursor-pointer select-none hover:bg-muted/30 transition-colors"
        onClick={onToggle}
      >
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
          {onUp && (
            <button 
              type="button"
              onClick={(e) => { e.stopPropagation(); onUp(); }}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              title="Move Up"
            >
              <ArrowUp size={16} />
            </button>
          )}
          {onDown && (
            <button 
              type="button"
              onClick={(e) => { e.stopPropagation(); onDown(); }}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              title="Move Down"
            >
              <ArrowDown size={16} />
            </button>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{title || "Untitled"}</h3>
          {subtitle && <p className="text-sm text-muted-foreground truncate">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
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
              title="Delete"
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

      {/* Expanded Form Area */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-5 sm:p-6 border-t border-border bg-muted/5">
              <div className="space-y-6">
                {children}
                
                {/* Save Button Row */}
                <div className="flex justify-end pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await onSave();
                        setShowSuccess(true);
                        setTimeout(() => setShowSuccess(false), 2000);
                      } catch (e) {
                        setShowError(true);
                        setTimeout(() => setShowError(false), 2000);
                      }
                    }}
                    disabled={!isDirty || isSaving || showSuccess}
                    className={`btn flex items-center gap-2 transition-colors ${
                      showSuccess 
                        ? "bg-green-600 hover:bg-green-600 text-white border-green-600" 
                        : showError
                        ? "bg-red-600 hover:bg-red-600 text-white border-red-600"
                        : "btn-primary"
                    }`}
                  >
                    <Save size={16} />
                    {showSuccess ? "Saved!" : showError ? "Error" : isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
